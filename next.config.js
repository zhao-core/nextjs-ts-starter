const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, 'assets/css/custom.less'), 'utf8'));

module.exports = withPlugins([withLess, withCss], {
  lessLoaderOptions: {
    //如果是antd就需要，antd-mobile不需要
    javascriptEnabled: true,
    modifyVars: themeVariables,
  },
  cssModules: true,
  cssLoaderOptions: {
    camelCase: true,
    localIdentName: '[local]___[hash:base64:5]',
  },
  webpack(config) {
    if (config.externals) {
      const includes = [/antd/];
      config.externals = config.externals.map((external) => {
        if (typeof external !== 'function') return external;
        return (ctx, req, cb) => {
          return includes.find((include) => (req.startsWith('.') ? include.test(path.resolve(ctx, req)) : include.test(req))) ? cb() : external(ctx, req, cb);
        };
      });
    }
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
  generateBuildId : async () => {
    return 'my-build-id';
  }
});

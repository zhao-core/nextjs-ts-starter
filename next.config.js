const withCss = require('@zeit/next-less');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, 'assets/css/custom.less'), 'utf8'));

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {};
}

function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn('HACK: Removing `minimize` option from `css-loader` entries in Webpack config');
  config.module.rules.forEach((rule) => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach((u) => {
        if (u.loader === 'css-loader' && u.options) {
          delete u.options.minimize;
        }
        if (u.loader === 'less-loader') {
          u.options = u.options || {};
          u.options.javascriptEnabled = true;
          u.options.modifyVars = themeVariables;
        }
      });
    }
  });
}

module.exports = withCss({
  webpack(config) {
    HACK_removeMinimizeOptionFromCssLoaders(config);
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
});

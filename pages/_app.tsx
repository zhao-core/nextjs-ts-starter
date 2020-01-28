import 'isomorphic-fetch';
import * as React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { getStore } from '../src/store';
import { Layout } from '../src/components/Layout/Layout';
import '../assets/css/styles.less';

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const server = !!ctx.req;
    const store = getStore(undefined, server);
    const state = store.getState();
    const out = { state, server } as any;

    if (Component.getInitialProps) {
      return {
        ...out,
        pageProps: {
          ...(await Component.getInitialProps(ctx)),
        },
      };
    }

    return out;
  }

  render() {
    const { props } = this as any;
    const { Component, pageProps } = props;

    return (
      <Container>
        <Provider store={getStore(undefined, props.server)}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

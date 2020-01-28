import * as React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './styles.less';
import classnames from 'classnames';
import Head from 'next/head';

export const Layout: React.FunctionComponent = (props) => (
  <div className={classnames(styles.layout)}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
    <Header />
    <main>{props.children}</main>
    <Footer />
  </div>
);

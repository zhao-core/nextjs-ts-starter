import * as React from 'react';
import classnames from 'classnames';
import { Nav } from './Layout/Nav';
import styles from './home.less';

export const Home: React.FunctionComponent = (props) => (
  <div className={classnames('home', styles.home)}>
    <Nav />
    <ul>
      <li>usage classnames in Home.tsx</li>
      <li>Layout.tsx set background-color hot-pink using global styled jsx</li>
    </ul>
  </div>
);

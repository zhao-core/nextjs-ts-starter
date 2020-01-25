import * as React from 'react';
import classnames from 'classnames';
import * as css from './Home.css';
import { Nav } from './Layout/Nav';

export const Home: React.FunctionComponent = (props) => (
  <div className={classnames('test', css.home)}>
    <Nav />
    <ul>
      <li>usage classnames in Home.tsx</li>
      <li>Layout.tsx set background-color hot-pink using global styled jsx</li>
    </ul>
  </div>
);

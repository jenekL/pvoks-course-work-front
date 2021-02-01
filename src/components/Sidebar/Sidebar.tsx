import React, { ReactElement } from 'react';
// @ts-ignore
import styles from './Sidebar.styl';
import Menu from './Menu';

const Sidebar = (): ReactElement => (
  <nav className={styles.sidebar}>
    <Menu />
  </nav>
);

export default Sidebar;

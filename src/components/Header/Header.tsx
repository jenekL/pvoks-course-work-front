import React, { FC, ReactElement } from 'react';
import Logo from './Logo';
// @ts-ignore
import styles from './Header.styl';

const Header: FC = (): ReactElement => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
};

export default Header;

import React, { FC, ReactElement } from 'react';

// @ts-ignore
import styles from './Footer.styl';

const Footer: FC = (): ReactElement => {

   return (
    <footer className={styles.footer}>
      <div className={styles.text}>
        Copyright 2021
      </div>
    </footer>
  );
};

export default Footer;

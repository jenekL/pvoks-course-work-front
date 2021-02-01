import React, { ReactElement } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
// @ts-ignore
import styles from './Layout.styl';
import {Footer} from './Footer';

interface IOwnProps {
  children: null | ReactElement | Array<null | ReactElement | ReactElement[]>;
}

type Props = IOwnProps;

const Layout = ({ children }: Props): ReactElement => (
  <div className={styles.wrap}>
    <Header />
    <main className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.page}>{children}</div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Layout;

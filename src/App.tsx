import React from 'react';
import styles from './App.module.scss';
import { MobxRootProvider } from './models/connect';
import { ApplicationRouter } from './router/router';

export const App = (): JSX.Element => {
  return (
    <div className={styles.App}>
      <MobxRootProvider>
        <ApplicationRouter />
      </MobxRootProvider>
    </div>
  );
};

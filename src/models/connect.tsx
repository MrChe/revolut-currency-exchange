// holds a reference to the store (singleton)
import React, { createContext, ReactNode, useContext } from 'react';
import { RootModel } from './RootModel';

let store: RootModel;

// create the context
const StoreContext = createContext<RootModel | null>(null);

// create the provider component
export const MobxRootProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // only create the store once ( store is a singleton)
  const root = store ?? new RootModel();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};

// create the hook
export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within MobxRootProvider');
  }

  return context;
};

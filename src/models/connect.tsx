// holds a reference to the store (singleton)
import React, { createContext, ReactNode, useContext } from "react";
import { RootModel } from "./RootModel";

// create the context
const MobxContext = createContext<RootModel | null>(null);

// create the provider component
export const MobxProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  // only create the store once ( store is a singleton)
  const root = new RootModel();

  return <MobxContext.Provider value={root}>{children}</MobxContext.Provider>;
};

// create the hook
export const useStore = (): RootModel => {
  const context = useContext(MobxContext);
  if (!context) {
    throw new Error("useStore must be used within MobxContext");
  }

  return context;
};

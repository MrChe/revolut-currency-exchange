// holds a reference to the store (singleton)
import { createContext, useContext } from "react";
import { RootModel } from "./RootModel";

// create the context
const MobxContext = createContext<RootModel | null>(null);

// create the provider component
export const MobxProvider = MobxContext.Provider;

// create the hook
export const useStore = (): RootModel => {
  const context = useContext(MobxContext);
  if (!context) {
    throw new Error("useStore must be used within MobxContext");
  }

  return context;
};

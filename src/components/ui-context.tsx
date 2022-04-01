import React, { createContext, ReactNode, useContext } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

export type UI = {
  drawer: UseDisclosureReturn;
};

const UIContext = createContext<UI>({} as UI);

export function UIProvider({ children }: { children: ReactNode }) {
  const drawer = useDisclosure();
  return (
    <UIContext.Provider
      value={{
        drawer,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}

export default UIContext;

import React, { createContext, useContext } from "react";
import { useDisclosure } from "@chakra-ui/core";

const UIContext = createContext();

export function UIProvider(props) {
  const drawer = useDisclosure();
  return (
    <UIContext.Provider
      value={{
        drawer,
      }}
      {...props}
    />
  );
}

export function useUI() {
  return useContext(UIContext);
}

export default UIContext;

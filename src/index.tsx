import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { UIProvider } from "./components/ui-context";

import App from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <UIProvider>
      <Router>
        <ChakraProvider>
          <CSSReset />
          <App />
        </ChakraProvider>
      </Router>
    </UIProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

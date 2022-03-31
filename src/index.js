import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { UIProvider } from "./components/ui-context";

import App from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <UIProvider>
      <Router>
        <ThemeProvider>
          <CSSReset />
          <App />
        </ThemeProvider>
      </Router>
    </UIProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

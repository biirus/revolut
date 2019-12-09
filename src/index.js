import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import Big from "big.js";

import getStore from "./redux/store";
import theme, { GlobalStyles } from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={getStore()}>
      <App />
    </Provider>
    <GlobalStyles />
  </ThemeProvider>,
  document.getElementById("root")
);

// округляет к ближайшему четному
const a = Big(0.008);
console.log(a.round(2, 2).toString());

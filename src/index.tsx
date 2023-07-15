import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { GlobalStyle } from "./global-style";
import createMockServer from "./mockServer/createMockServer";
import QueryProvider from "./quries/QueryProvider";
import store from "./redux/store";

createMockServer();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <GlobalStyle />
        <App />
      </QueryProvider>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

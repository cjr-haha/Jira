import React from "react";
import ReactDOM from "react-dom/client";
import { loadServer, DevTools } from "jira-dev-tool";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import AppContext from "./context/AppContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

loadServer(() => {
  root.render(
    // <React.StrictMode>
    <AppContext>
      <DevTools />
      <App />
    </AppContext>
    // </React.StrictMode>
  );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

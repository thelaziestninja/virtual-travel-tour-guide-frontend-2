import "./index.css";
import React from "react";
import App from "./App.tsx";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom/client";
import { destinationStore } from "./stores/destinationStore.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider destinationStore={destinationStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

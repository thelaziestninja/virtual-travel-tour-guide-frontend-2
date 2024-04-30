import "./index.css";
import React from "react";
import App from "./App.tsx";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom/client";
import { feedbackStore } from "./stores/feedbackStore.ts";
import { destinationStore } from "./stores/destinationStore.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider destinationStore={destinationStore} feedbackStore={feedbackStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

import { StrictMode, useReducer } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DataProvider } from "./components/DataProvider/DataProvider.jsx";
import { initialState, reducer } from "./Utility/reducer.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <DataProvider reducer={reducer} initialState={initialState}>
    <App />
  </DataProvider>
  // </StrictMode>
);

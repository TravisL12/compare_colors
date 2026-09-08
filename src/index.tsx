import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import "./index.css";
import App from "./components/App";

/**
 * styled-components v6 forwards every prop to the DOM unless told otherwise,
 * which makes React warn about `fullWidth`, `showInfo` and friends. Only let
 * real HTML attributes through to host elements.
 */
const shouldForwardProp = (prop: string, target: unknown) =>
  typeof target === "string" ? isPropValid(prop) : true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <App />
    </StyleSheetManager>
  </StrictMode>
);

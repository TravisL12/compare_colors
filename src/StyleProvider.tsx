import type { ReactNode } from "react";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

/**
 * styled-components v6 forwards every prop to the DOM unless told otherwise,
 * which makes React warn about `fullWidth`, `showInfo` and friends. Only let
 * real HTML attributes through to host elements.
 *
 * Lives in its own module so tests render through the same setup the app uses.
 */
const shouldForwardProp = (prop: string, target: unknown) =>
  typeof target === "string" ? isPropValid(prop) : true;

const StyleProvider = ({ children }: { children: ReactNode }) => (
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    {children}
  </StyleSheetManager>
);

export default StyleProvider;

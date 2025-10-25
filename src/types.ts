import type { Dispatch, SetStateAction } from "react";
import type Color from "./models/color";

export type ColorGridProps = {
  colors: Color[];
  displayedColor: Color | null;
  setDisplayedColor: Dispatch<SetStateAction<Color | null>>;
};

export type ComparisonPanelProps = {
  compareColor: Color;
  updateCompareColor: () => void;
};

export type SelectedColorProps = {
  displayedColor: Color | null;
  colorCollection: Color[];
  setDisplayedColor: Dispatch<SetStateAction<Color | null>>;
};

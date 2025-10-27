import type { Dispatch, ChangeEvent, SetStateAction } from "react";
import type Color from "./models/color";

export type ColorGridProps = {
  colors: Color[];
  displayedColor: Color | null;
  setDisplayedColor: Dispatch<SetStateAction<Color | null>>;
};

export type ComparisonPanelProps = {
  compareColor: Color;
  updateCompareColor: (e: ChangeEvent) => void;
};

export type SelectedColorProps = {
  displayedColor?: Color;
  colorCollection: Color[];
  setDisplayedColor: Dispatch<SetStateAction<Color | null>>;
};

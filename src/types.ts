import type { Dispatch, ChangeEvent, SetStateAction } from "react";
import type Color from "./models/color";

export type SortMethod = "off" | "distanceChromatic" | "distanceDelta";

export type ColorGridProps = {
  colors: Color[];
  displayedColor: Color | null;
  setDisplayedColor: Dispatch<SetStateAction<Color | null>>;
};

export type ComparisonPanelProps = {
  compareColor: Color;
  updateCompareColor: (
    e: ChangeEvent<HTMLInputElement> | { target: { value: string } }
  ) => void;
};

export type SelectedColorProps = {
  displayedColor: Color | null;
  colorCollection: Color[];
  setDisplayedColor: Dispatch<SetStateAction<Color | null>>;
};

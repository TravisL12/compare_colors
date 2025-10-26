import {
  SLabelColor,
  SSelectedColor,
  SCompareColor,
  SColorInput,
} from "./ColorGrid.style";
import { QUICK_COMPARE_COLORS } from "../../constants";
import type { ComparisonPanelProps } from "../../types";
import { SFlex } from "../App/App.style";

function ComparisonPanel({
  compareColor,
  updateCompareColor,
}: ComparisonPanelProps) {
  return (
    <SSelectedColor gap={4}>
      <SLabelColor color={compareColor.hexString}>
        <input
          type="color"
          id="compare-color-type"
          onChange={updateCompareColor}
          value={compareColor.hexString}
        />
        <label htmlFor="compare-color-type" />
      </SLabelColor>
      <SFlex
        justify="space-between"
        column
        style={{ height: "100%", padding: "5px", flex: 1 }}
      >
        <SColorInput>
          <label htmlFor="compare-color-text">
            <strong>Compare color</strong>
          </label>
          <input
            type="text"
            id="compare-color-text"
            onChange={updateCompareColor}
            value={compareColor.name || compareColor.hexColor}
            placeholder="#000000 (Default)"
          />
        </SColorInput>
        <strong>Quick colors</strong>
        <SFlex gap={5} wrap>
          {QUICK_COMPARE_COLORS.map((color) => (
            <SCompareColor
              key={color}
              onClick={() => updateCompareColor({ target: { value: color } })}
              color={color}
            />
          ))}
        </SFlex>
      </SFlex>
    </SSelectedColor>
  );
}

export default ComparisonPanel;

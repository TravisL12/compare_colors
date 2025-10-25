import {
  SComparisonPanel,
  SLabelColor,
  SSelectedColor,
  SCompareColor,
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
        <div className="color-text-input">
          <input
            type="text"
            id="compare-color-text"
            onChange={updateCompareColor}
            value={compareColor.name || compareColor.hexColor}
            placeholder="#000000 (Default)"
          />
        </div>
      </SLabelColor>
      <SFlex justify="space-between" column style={{ flex: 1 }}>
        <strong>Comparison</strong>
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

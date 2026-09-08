import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  SLabelColor,
  SSelectedColor,
  SCompareColor,
  SColorInput,
} from "./ColorGrid.style";
import { QUICK_COMPARE_COLORS } from "../../constants";
import type { ComparisonPanelProps } from "../../types";
import { SFlex } from "../App/App.style";
import { browserColorsByName } from "../../browserColorsList.ts";
import { isColorValue } from "../../utilities/color-utils";

const isParseable = (value: string) =>
  isColorValue(value) || Boolean(browserColorsByName[value.trim().toLowerCase()]);

function ComparisonPanel({
  compareColor,
  updateCompareColor,
}: ComparisonPanelProps) {
  // The field keeps its own draft so half-typed input survives. Pushing every
  // keystroke through `new Color()` would rewrite "r" to "#R" before the user
  // could finish typing "red".
  const [draft, setDraft] = useState(
    compareColor.name || compareColor.hexString
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const canonical = compareColor.name || compareColor.hexString;

  // Follow the picker and the quick swatches, which set the colour elsewhere -
  // but never while the field has focus. A partial value like "#00f" parses on
  // its own, and rewriting the field to "blue" mid-word would mangle the rest
  // of what the user is typing.
  useEffect(() => {
    if (document.activeElement === inputRef.current) return;
    setDraft(canonical);
  }, [canonical]);

  const onDraftChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDraft(value);
    if (isParseable(value)) updateCompareColor({ target: { value } });
  };

  return (
    <SSelectedColor gap={4}>
      <SLabelColor color={compareColor.hexString}>
        <input
          type="color"
          id="compare-color-type"
          onChange={updateCompareColor}
          value={compareColor.hexString.slice(0, 7)}
          aria-label="Pick a comparison colour"
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
            ref={inputRef}
            type="text"
            id="compare-color-text"
            onChange={onDraftChange}
            onBlur={() => setDraft(canonical)}
            value={draft}
            spellCheck="false"
            placeholder="#000000, rgb(), hsl() or a colour name"
            aria-invalid={draft.length > 0 && !isParseable(draft)}
          />
        </SColorInput>
        <strong>Quick colors</strong>
        <SFlex gap={5} $wrap>
          {QUICK_COMPARE_COLORS.map((color) => (
            <SCompareColor
              key={color}
              type="button"
              onClick={() => updateCompareColor({ target: { value: color } })}
              color={color}
              aria-label={`Compare against ${color}`}
              title={color}
            />
          ))}
        </SFlex>
      </SFlex>
    </SSelectedColor>
  );
}

export default ComparisonPanel;

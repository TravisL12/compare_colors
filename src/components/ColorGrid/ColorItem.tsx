import { forwardRef } from "react";
import { copyText } from "../../utilities/color-utils";
import { SColorItem } from "./ColorGrid.style";
import type Color from "../../models/color";

type ColorItemProps = {
  color: Color;
  showInfo: boolean;
  setDisplayedColor: (color: Color) => void;
  isSelected: boolean;
};

const ColorItem = forwardRef<HTMLDivElement, ColorItemProps>(
  ({ color, showInfo, setDisplayedColor, isSelected }, ref) => {
    const { hexString, rgbString, hslString, name, initialColor } = color;

    const displayValues = [hexString, rgbString, hslString, name].filter(
      (str) => str && str.toLowerCase() !== initialColor.toLowerCase()
    );

    return (
      <SColorItem isSelected={isSelected} showInfo={showInfo} ref={ref}>
        <button
          type="button"
          className="square"
          style={{ background: hexString }}
          onClick={() => setDisplayedColor(color)}
          aria-pressed={isSelected}
          aria-label={`Select ${name || hexString}`}
          title={name || hexString}
        />
        {showInfo && (
          <div className="names">
            <CopyableValue value={initialColor} />
            {displayValues.map((val) => (
              <CopyableValue key={val} value={val} />
            ))}
          </div>
        )}
      </SColorItem>
    );
  }
);

ColorItem.displayName = "ColorItem";

const CopyableValue = ({ value }: { value: string }) => (
  <p
    role="button"
    tabIndex={0}
    title={`Copy ${value}`}
    onClick={copyText}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        copyText(event);
      }
    }}
  >
    {value}
  </p>
);

export default ColorItem;

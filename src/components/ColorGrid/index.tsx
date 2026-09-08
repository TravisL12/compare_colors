import { createRef, useEffect, useMemo, useRef, useState } from "react";
import Color from "../../models/color";
import ColorItem from "./ColorItem";
import ComparisonPanel from "./ComparisonPanel";
import {
  distanceDelta,
  distanceChromatic,
} from "../../utilities/distance-utils";
import { browserColorsByName } from "../../browserColorsList.ts";
import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../../constants.ts";
import {
  SColumn,
  H2,
  SButton,
  SFlex,
  SOptions,
  SRadioButton,
} from "../App/App.style";
import { SColorGridDisplay, SComparisonPanel } from "./ColorGrid.style";
import { uniqBy } from "lodash";
import type { ColorGridProps, SortMethod } from "../../types.ts";
import SelectedColor from "./SelectedColor.tsx";

const SORT_OPTIONS: { value: SortMethod; label: string }[] = [
  { value: SORT_CHROMATIC, label: "Chromatic Sort" },
  { value: SORT_DELTA, label: "DeltaE Sort" },
  { value: SORT_OFF, label: "No Sorting" },
];

const sortTypes: Record<
  Exclude<SortMethod, "off">,
  (compare: Color, target?: Color) => number
> = { distanceDelta, distanceChromatic };

function ColorGrid({
  colors,
  displayedColor,
  setDisplayedColor,
}: ColorGridProps) {
  const [compareColor, setCompareColor] = useState(() => new Color("000000"));
  const [showInfo, setShowInfo] = useState(true);
  const [sortMethod, setSortMethod] = useState<SortMethod>(SORT_OFF);
  const areColorsSorted = sortMethod !== SORT_OFF;

  const sortedColors = useMemo(() => {
    if (sortMethod === SORT_OFF) return uniqBy(colors, "hexString");

    const distance = sortTypes[sortMethod];
    const sorted = colors
      .slice()
      .sort((a, b) => distance(a, compareColor) - distance(b, compareColor));

    return uniqBy(sorted, "hexString");
  }, [colors, sortMethod, compareColor]);

  // The grid shows one swatch per distinct colour, so refs are keyed by value
  // rather than by occurrence - selecting the 7th `#FF0000` in the text still
  // has to scroll to the single `#FF0000` swatch.
  const itemRefs = useMemo(
    () =>
      sortedColors.reduce((acc, color) => {
        acc[color.hexString] = createRef<HTMLDivElement>();
        return acc;
      }, {} as Record<string, React.RefObject<HTMLDivElement | null>>),
    [sortedColors]
  );

  // Scroll only when the selection actually moves to a different swatch.
  // `displayedColor` and `itemRefs` are both rebuilt on every keystroke, so
  // depending on them directly would scroll the grid while the user types.
  const lastScrolledTo = useRef<string | null>(null);
  useEffect(() => {
    const target = displayedColor?.hexString ?? null;
    const isFirstSelection = lastScrolledTo.current === null;
    const hasMoved = target !== lastScrolledTo.current;
    lastScrolledTo.current = target;

    // The first selection happens automatically on load; scrolling to it would
    // yank the reader away before they have read anything.
    if (!target || isFirstSelection || !hasMoved) return;

    itemRefs[target]?.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [itemRefs, displayedColor]);

  // Keep the selection pointing at something that still exists in the text.
  useEffect(() => {
    if (colors.length === 0) {
      setDisplayedColor(null);
      return;
    }

    if (!displayedColor) {
      setDisplayedColor(colors[0]);
      return;
    }

    // Ids are positional and get reassigned on every parse, so an id alone can
    // silently point at a different colour after an edit. Prefer the same
    // occurrence, fall back to the same colour elsewhere in the text, and only
    // then give up and select the first one.
    const sameOccurrence = colors.find(
      (color) =>
        color.id === displayedColor.id &&
        color.hexString === displayedColor.hexString
    );
    const sameColor = colors.find(
      (color) => color.hexString === displayedColor.hexString
    );
    const replacement = sameOccurrence ?? sameColor ?? colors[0];

    if (replacement !== displayedColor) setDisplayedColor(replacement);
  }, [colors, displayedColor, setDisplayedColor]);

  const updateCompareColor = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    const browserColor = browserColorsByName[value.toLowerCase()];
    setCompareColor(new Color(browserColor || value));
    if (!areColorsSorted) {
      setSortMethod(SORT_CHROMATIC);
    }
  };

  const colorCollection = useMemo(
    () =>
      displayedColor
        ? colors.filter((c) => c.hexString === displayedColor.hexString)
        : [],
    [colors, displayedColor]
  );

  return (
    <SColumn column fullWidth>
      <SComparisonPanel column fullWidth>
        <ComparisonPanel
          compareColor={compareColor}
          updateCompareColor={updateCompareColor}
        />
      </SComparisonPanel>
      <SOptions column fullWidth>
        <H2>Extracted Color Values</H2>
      </SOptions>
      <SelectedColor
        displayedColor={displayedColor}
        colorCollection={colorCollection}
        setDisplayedColor={setDisplayedColor}
      />
      <SColorGridDisplay showInfo={showInfo}>
        <SFlex
          fullWidth
          justify="space-between"
          alignItems="center"
          $wrap
          gap={10}
          className="grid-toolbar"
        >
          <SOptions gap={10} $wrap role="group" aria-label="Sort colours">
            {SORT_OPTIONS.map(({ value, label }) => (
              <SRadioButton key={value}>
                <input
                  type="radio"
                  id={`compare-${value}`}
                  name="sortOption"
                  checked={sortMethod === value}
                  onChange={() => setSortMethod(value)}
                  value={value}
                />
                <label htmlFor={`compare-${value}`}>{label}</label>
              </SRadioButton>
            ))}
          </SOptions>

          <SButton
            aria-pressed={showInfo}
            onClick={() => setShowInfo((shown) => !shown)}
          >
            {showInfo ? "Details On" : "Details Off"}
          </SButton>
        </SFlex>

        {sortedColors.length === 0 ? (
          <p className="empty-state">
            No colours found yet. Paste some text on the left to get started.
          </p>
        ) : (
          sortedColors.map((color) => (
            <ColorItem
              key={color.hexString}
              ref={itemRefs[color.hexString]}
              isSelected={color.hexString === displayedColor?.hexString}
              setDisplayedColor={setDisplayedColor}
              color={color}
              showInfo={showInfo}
            />
          ))
        )}
      </SColorGridDisplay>
    </SColumn>
  );
}

export default ColorGrid;

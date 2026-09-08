import {
  browserColorsByName,
  browserColorsByHex,
} from "../browserColorsList.ts";
import { format2hex, hex2dec } from "../utilities/hexadecimal-utils";
import { hslDec2array, isColorHsl } from "../utilities/hsl-utils";

export default class Color {
  id: number;
  initialColor: string;
  red: number;
  green: number;
  blue: number;
  alpha: number;
  hexColor: string;
  hexString: string;
  hslString: string;
  hue: number;
  saturation: number;
  lightness: number;
  name: string;
  rgbColor: number[];
  rgbString: string;

  constructor(color = "000000", id = 0) {
    this.id = id;
    this.initialColor = color;
    this.hue = 0;
    this.saturation = 0;
    this.lightness = 0;
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.alpha = 1;
    this.name = "";
    this.hexString = "";
    this.hexColor = "";
    this.rgbColor = [];

    const namedHex = browserColorsByName[color.toLowerCase()];
    if (namedHex) {
      this.name = color.toLowerCase();
      this.hexString = namedHex;
    }

    this.initialColorFormat();

    const hasAlpha = this.alpha < 1;

    this.hexString = `#${this.hexColor}`.toUpperCase();
    this.rgbString = hasAlpha
      ? `rgba(${this.red},${this.green},${this.blue},${this.alpha})`
      : `rgb(${this.red},${this.green},${this.blue})`;
    this.hslString = hasAlpha
      ? `hsl(${this.hue} ${this.saturation}% ${this.lightness}% / ${Math.round(
          this.alpha * 100
        )}%)`
      : `hsl(${this.hue} ${this.saturation}% ${this.lightness}%)`;

    const namedMatch = browserColorsByHex[this.hexString];
    if (namedMatch) {
      this.name = namedMatch;
    }
  }

  initialColorFormat = () => {
    this.hexColor = format2hex(this.hexString || this.initialColor);
    this.rgbColor = hex2dec(this.hexColor);

    const [red, green, blue, alpha] = this.rgbColor;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha ?? 1;

    if (isColorHsl(this.initialColor)) {
      // Trust the author's own hue/saturation/lightness rather than
      // round-tripping them through hex, which loses precision.
      const [h, s, l, hslAlpha] = hslDec2array(this.initialColor);
      this.calculateHsl(h, s, l);
      if (hslAlpha !== undefined) {
        this.alpha = hslAlpha;
      }
    } else {
      this.generateHsl();
    }
  };

  // https://codepen.io/pankajparashar/pen/oFzIg
  generateHsl = () => {
    const [r, g, b] = [this.red, this.green, this.blue].map((i) => i / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }

      h /= 6;
    }

    this.calculateHsl(h, s, l);
  };

  calculateHsl = (h: number, s: number, l: number) => {
    this.hue = Math.round(h * 360);
    this.saturation = Math.round(s * 100);
    this.lightness = Math.round(l * 100);
  };
}

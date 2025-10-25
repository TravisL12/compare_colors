import {
  browserColorsByName,
  browserColorsByHex,
} from "../browserColorsList.ts";
import { format2hex, hex2dec } from "../utilities/hexadecimal-utils";
import { hslDec2array, isColorHsl } from "../utilities/hsl-utils";

export default class Color {
  id: string;
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

  constructor(color = "000000", id?: string) {
    this.id = id || "";
    this.initialColor = color;
    this.hue = 0;
    this.saturation = 0;
    this.lightness = 0;
    this.name = "";
    this.hexString = "";

    if (browserColorsByName[color]) {
      this.name = color;
      this.hexString = browserColorsByName[color];
    }

    this.hexColor = format2hex(this.hexString || this.initialColor);
    this.rgbColor = hex2dec(this.hexColor);
    [this.red, this.blue, this.green, this.alpha] = this.rgbColor;

    if (isColorHsl(this.initialColor)) {
      const [h, s, l, alpha] = hslDec2array(this.initialColor);
      this.calculateHsl(h, s, l);
      if (alpha) {
        this.alpha = alpha;
      }
    } else {
      this.generateHsl();
    }

    this.hexString = `#${this.hexColor}`.toUpperCase();
    this.rgbString = this.alpha
      ? `rgba(${this.red},${this.blue},${this.green},${this.alpha})`.toUpperCase()
      : `rgb(${this.red},${this.blue},${this.green})`.toUpperCase();
    this.hslString = this.alpha
      ? `hsl(${this.hue} ${this.saturation}% ${this.lightness}% / ${
          this.alpha * 100
        }%)`.toUpperCase()
      : `hsl(${this.hue} ${this.saturation}% ${this.lightness}%)`.toUpperCase();

    if (browserColorsByHex[this.hexString]) {
      this.name = browserColorsByHex[this.hexString];
    }
  }

  // https://codepen.io/pankajparashar/pen/oFzIg
  generateHsl = () => {
    const [r, g, b] = this.rgbColor.map((i) => i / 255);
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
    this.hue = (h * 360 + 0.5) | 0;
    this.saturation = (s * 100 + 0.5) | 0;
    this.lightness = (l * 100 + 0.5) | 0;
  };
}

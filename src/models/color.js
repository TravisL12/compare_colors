import { browserColorsByName, browserColorsByHex } from "../browserColorsList";
import { format2hex, hex2dec } from "../utilities/hexadecimal-utils";
import { hslDec2array, isColorHsl } from "../utilities/hsl-utils";
export default class Color {
  constructor(color = "000000", id) {
    this.id = id + 1;
    this.initialColor = color;

    if (browserColorsByName[color]) {
      this.name = color;
      this.initialColor = browserColorsByName[color];
    }

    if (browserColorsByHex[this.initialColor]) {
      this.name = browserColorsByHex[this.hexString];
    }

    this.hexColor = format2hex(this.initialColor);
    this.rgbColor = hex2dec(this.hexColor);

    if (isColorHsl(this.initialColor)) {
      const [h, s, l] = hslDec2array(this.initialColor);
      this.calculateHsl(h, s, l);
    } else {
      this.generateHsl();
    }

    [this.red, this.blue, this.green] = this.rgbColor;

    this.hexString = `#${this.hexColor}`;
    this.rgbString = `rgb(${this.red},${this.blue},${this.green})`;
    this.hslString = `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
  }

  // https://codepen.io/pankajparashar/pen/oFzIg
  generateHsl() {
    const [r, g, b] = this.rgbColor.map((i) => i / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

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
  }

  calculateHsl(h, s, l) {
    this.hue = (h * 360 + 0.5) | 0;
    this.saturation = (s * 100 + 0.5) | 0;
    this.lightness = (l * 100 + 0.5) | 0;
  }
}

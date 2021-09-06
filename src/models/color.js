import { format2hex, hex2dec } from "../color-utils";
import { browserColorsHexKey } from "../browserColorsList";

export default class Color {
  constructor(color = "000000", name, id) {
    this.id = id;
    this.hexColor = format2hex(color);
    this.rgbColor = hex2dec(this.hexColor);
    this.createHsl();
    [this.red, this.blue, this.green] = this.rgbColor;

    this.hexString = `#${this.hexColor}`;
    this.rgbString = `rgb(${[this.red, this.blue, this.green].join(",")})`;
    this.hslString = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;

    if (name) {
      this.name = name;
    } else if (browserColorsHexKey[this.hexString]) {
      this.name = browserColorsHexKey[this.hexString];
    }
  }

  // https://codepen.io/pankajparashar/pen/oFzIg
  createHsl() {
    const rgb = this.rgbColor.map((i) => i / 255);
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    const max = Math.max(...rgb);
    const min = Math.min(...rgb);
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

    this.hue = (h * 100 + 0.5) | 0;
    this.saturation = (s * 100 + 0.5) | 0;
    this.lightness = (l * 100 + 0.5) | 0;
  }
}

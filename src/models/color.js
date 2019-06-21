import { isColorRgb, dec2array, format2hex, hex2dec } from "../color-utils";

export default class ColorModel {
  constructor(color = "000000", id) {
    this.entry = color;
    if (id) {
      this.id = id;
    }

    if (isColorRgb(this.entry)) {
      [this.red, this.blue, this.green] = dec2array(color);
      this.hexColor = format2hex(this.entry);
    } else {
      this.hexColor = format2hex(this.entry);
      [this.red, this.blue, this.green] = hex2dec(this.hexColor);
    }

    this.toString = {
      hex: `#${this.hexColor}`,
      rgb: `rgb(${[this.red, this.blue, this.green].join(",")})`,
      hsl: `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`
    };

    this.rgbColor = [this.red, this.blue, this.green];
    this.hslColor = [this.hue, this.saturation, this.lightness];
    this.createHsl();
  }

  // https://codepen.io/pankajparashar/pen/oFzIg
  createHsl() {
    const rgb = this.rgbColor.map(i => i / 255);
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

import { isColorRgb, dec2array, format2hex, hex2dec } from "../color-utils";

export default class Color {
  constructor(color, id) {
    this.originalColorEntry = color;
    if (id) {
      this.id = id;
    }

    if (isColorRgb(this.originalColorEntry)) {
      [this.red, this.blue, this.green] = dec2array(color);
    } else {
      this.hex = format2hex(this.originalColorEntry);
      [this.red, this.blue, this.green] = hex2dec(this.hex);
    }

    this.createHsl();
  }

  hexValue() {
    return this.hex;
  }

  hexString() {
    return `#${this.hex}`;
  }

  rgbValue() {
    return [this.red, this.blue, this.green];
  }

  rgbString() {
    return `rgb(${[this.red, this.blue, this.green].join(",")})`;
  }

  hslValue() {
    return [this.hue, this.saturation, this.lightness];
  }

  hslString() {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
  }

  createHsl() {
    const rgb = this.rgbValue().map(i => i / 255);
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

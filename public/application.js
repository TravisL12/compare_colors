// be able to enter in a bunch of colors, regardless of format (hex, rgba, hsl)
// parse by line breaks and then output the colors

// also make something where you can compare a single color against a library of colors to determine which is the closest match (if not exact match)

/** TEST COLORS
#353B4B
#ff001E
#1C202A
#3A3A48
#0fa912
#232836
#454E5F
 */

class Color {
  constructor(color, id) {
    this.color = this.cleanColor(color);
    this.el = document.createElement("div");
    this.el.classList = `square square-${id}`;
    this.el.style.cssText = `background-color: #${this.color}`;
    this.el.textContent = `#${this.color}`;
    console.log(this.hex2dec(), color);
  }

  cleanColor(color) {
    return color.replace(/[\'#]/gi, "");
  }

  hex2dec() {
    const split = [
      this.color.slice(0, 2),
      this.color.slice(2, 4),
      this.color.slice(4, 6)
    ];
    return split.map(c => {
      return parseInt(c, 16);
    });
  }

  distance(target) {
    const tDec = this.hex2dec(target);
    const cDec = this.hex2dec(this.color);
    const red = Math.pow(tDec[0] - cDec[0], 2);
    const green = Math.pow(tDec[1] - cDec[1], 2);
    const blue = Math.pow(tDec[2] - cDec[2], 2);

    return Math.sqrt(red + green + blue);
  }
}

const parseColors = () => {
  const all = results.querySelector(".all");
  all.innerHTML = "";
  const colors = colorTextarea.value.split("\n");

  for (let i = 0; i < colors.length; i++) {
    const color = new Color(colors[i], i);
    all.appendChild(color.el);
  }
};

const resetDisplay = () => {
  colorTextarea.value = "";
  const all = results.querySelector(".all");
  if (all) {
    all.innerHTML = "";
  }
};

const colorTextarea = document.getElementById("colors");
const results = document.getElementById("results");
const resetBtn = document.getElementById("reset");
const convertBtn = document.getElementById("convert");

convertBtn.addEventListener("click", parseColors);
resetBtn.addEventListener("click", resetDisplay);

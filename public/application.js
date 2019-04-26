// be able to enter in a bunch of colors, regardless of format (hex, rgba, hsl)
// parse by line breaks and then output the colors

// also make something where you can compare a single color against a library of colors to determine which is the closest match (if not exact match)

/** TEST COLORS
#00001E
#1C202A
#232836
#353B4B
#3A3A48
#454E5F
 */

class Color {
  constructor(color, id) {
    this.color = this.cleanColor(color);
    this.el = document.createElement("div");
    this.el.classList = `square square-${id}`;
    this.el.style.cssText = `background-color: ${this.color}`;
  }

  cleanColor(color) {
    return color.replace(/\'/gi, "");
  }
}

const parseColors = event => {
  const all = results.querySelector(".all");
  const colors = event.target.value.split("\n");

  for (let i = 0; i < colors.length; i++) {
    console.log(i, "count");
    const color = new Color(colors[i], i);
    all.appendChild(color.el);
  }
};

const colorTextarea = document.getElementById("colors");
const results = document.getElementById("results");
const resetBtn = document.getElementById("reset");

colorTextarea.addEventListener("change", parseColors);
colorTextarea.addEventListener("input", parseColors);

resetBtn.addEventListener("click", event => {
  colorTextarea.value = "";
  const text = results.querySelector(".all");
  if (text) {
    results.removeChild(text);
  }
});

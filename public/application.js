// be able to enter in a bunch of colors, regardless of format (hex, rgba, hsl)
// parse by line breaks and then output the colors

// also make something where you can compare a single color against a library of colors to determine which is the closest match (if not exact match)

const colorTextarea = document.getElementById("colors");
const results = document.getElementById("results");
const reset = document.getElementById("reset");

colorTextarea.addEventListener("change", event => {
  const text = document.createElement("p");
  text.classList.add("all");

  text.textContent = event.target.value.split("\n");
  results.appendChild(text);
});

reset.addEventListener("click", event => {
  colorTextarea.value = "";
  const text = results.querySelector(".all");
  if (text) {
    results.removeChild(text);
  }
});

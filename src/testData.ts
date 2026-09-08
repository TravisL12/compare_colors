export const demoText = `Welcome to ColorSnippet.

Paste any text that has colours in it — a stylesheet, a design token file, a config, an email from a client — and every colour is pulled out into the grid. Nothing is uploaded anywhere; it all runs in your browser.

HOW IT WORKS

1. Paste your text over this message. Colours get highlighted right here in place, in their own colour.

2. Click any highlighted colour in the text to select it. The grid scrolls to that swatch, and the panel above shows it in hex, RGB and HSL.

3. Click a swatch in the grid to jump the other way — back to the spot in the text where it appeared.

4. Click any value — #FF6641, rgb(255, 102, 65) — to copy it to your clipboard. It flashes to confirm.

FINDING THE CLOSEST MATCH

Set a "Compare colour" at the top of the colour panel, either with the picker, by typing a value, or from the quick swatches. Then sort:

• Chromatic sort — straight RGB distance. Fast and literal.

• DeltaE sort — CIELAB Delta-E 94, which sorts by how different the colours look to a human eye rather than how different their numbers are.

Handy when a client says "make it a bit more like our blue" and you need to find which of your existing tokens is actually nearest.

FORMATS IT UNDERSTANDS

Hex, 3, 4, 6 or 8 digits — #0f0, #00ff00, #ff112980

RGB and RGBA — rgb(200, 100, 50), rgba(50, 10, 200, 0.5)

HSL and HSLA — hsl(200, 50%, 50%), hsl(150 29% 80% / 40%)

CSS colour names — lightblue, magenta, cornsilk, dodgerblue, rebeccapurple

Repeated colours are grouped: pick one and use Previous / Next in the selection panel to step through every place it occurs.

Try it now — or hit "Sample palette" above to load a longer example.
`;

export const paletteSample = `/* tokens.css - brand palette */
:root {
  --blue-100: #92CBFF;
  --blue-200: #79B2F1;
  --blue-300: #699BD2;
  --blue-400: #5984B2;
  --blue-500: #4C7098;

  --green-100: #7FD9B0;
  --green-200: #4FBC8B;
  --green-300: #2C9C71;
  --green-400: #268460;
  --green-500: #1B6248;

  --red-100: #FFA88B;
  --red-200: #FF845F;
  --red-300: #FF6641;
  --red-400: #E04B27;
  --red-500: #B33718;

  --purple-100: #9C86CF;
  --purple-200: #8468BC;
  --purple-300: #7054AF;
  --purple-400: #5F4795;
  --purple-500: #4A3676;

  --surface: #F9F9F9;
  --surface-raised: white;
  --border: #ECECEC;
  --text: #444444;
  --text-muted: rgb(120, 120, 120);
}

/* legacy values still in the old theme file */
.button--primary   { background: rgb(76, 112, 152); }
.button--danger    { background: rgb(255, 102, 65); }
.button--ghost     { background: transparent; border: 1px solid #ECECEC; }
.badge--new        { background: hsl(159, 81%, 71%); }
.badge--beta       { background: hsl(255, 56%, 46%); }
.badge--deprecated { background: hsl(19, 54%, 62%); }

/* imported from the marketing site - not yet reconciled */
$brand-blue:   #4B6F97;
$brand-green:  #2B9B70;
$brand-red:    #FE6540;
$brand-purple: #6F53AE;
$accent:       hsl(44, 95%, 33%);
$accent-light: hsl(42, 72%, 70%);
$warning:      rgb(251, 247, 14);
$info:         dodgerblue;
$success:      mediumseagreen;
$muted:        lightslategray;

/* chart series, from the analytics dashboard */
const SERIES = [
  rgb(141, 153, 77),
  rgb(210, 139, 106),
  rgb(121, 241, 199),
  rgb(164, 121, 4),
  rgb(84, 52, 183),
  rgb(102, 208, 88),
  rgb(234, 201, 123),
];

/* semi-transparent overlays */
.scrim      { background: rgba(0, 0, 0, 0.5); }
.scrim--soft{ background: hsl(0 0% 0% / 25%); }
.highlight  { background: #FFEB3B40; }
`;

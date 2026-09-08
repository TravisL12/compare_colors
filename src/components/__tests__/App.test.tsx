import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import StyleProvider from "../../StyleProvider";

const renderApp = () => {
  const user = userEvent.setup();
  // Rendered through the same provider as production so the tests exercise the
  // real prop filtering rather than a bare tree that warns on every render.
  render(
    <StyleProvider>
      <App />
    </StyleProvider>
  );
  return user;
};

/**
 * Pastes in one go rather than typing character by character - that is how the
 * app is actually used, and incremental typing walks the selection along as
 * each new colour appears.
 */
const pasteText = async (user: ReturnType<typeof userEvent.setup>, text: string) => {
  await user.clear(textarea());
  await user.click(textarea());
  await user.paste(text);
};

const textarea = () =>
  screen.getByLabelText(/paste text containing colour values/i);

const selectionPanel = () =>
  screen.getByText("Selection").closest("div") as HTMLElement;

describe("App", () => {
  it("renders the ColorSnippet branding", () => {
    renderApp();
    expect(
      screen.getByRole("heading", { name: "ColorSnippet", level: 1 })
    ).toBeInTheDocument();
  });

  it("extracts colours from pasted text", async () => {
    const user = renderApp();
    await pasteText(user, "#ff0000 and dodgerblue");

    expect(
      screen.getByRole("button", { name: /select red/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /select dodgerblue/i })
    ).toBeInTheDocument();
  });

  it("shows hex, rgb and hsl for the selection", async () => {
    const user = renderApp();
    await pasteText(user, "#ff0000");

    const panel = selectionPanel();
    expect(within(panel).getByText("#FF0000")).toBeInTheDocument();
    expect(within(panel).getByText("rgb(255,0,0)")).toBeInTheDocument();
    // Regression: this used to render hsl(0 0% 0%) for every colour.
    expect(within(panel).getByText("hsl(0 100% 50%)")).toBeInTheDocument();
  });

  it("selects a colour when its swatch is clicked", async () => {
    const user = renderApp();
    await pasteText(user, "#ff0000 #0000ff");

    await user.click(screen.getByRole("button", { name: /select blue/i }));

    expect(within(selectionPanel()).getByText("#0000FF")).toBeInTheDocument();
  });

  it("copies a value to the clipboard when clicked", async () => {
    const user = renderApp();
    await pasteText(user, "#ff0000");

    await user.click(within(selectionPanel()).getByText("#FF0000"));

    // userEvent.setup() installs its own clipboard stub, so read it back
    // rather than asserting on the spy from the test setup file.
    expect(await navigator.clipboard.readText()).toBe("#FF0000");
  });

  it("steps through repeated occurrences of the same colour", async () => {
    const user = renderApp();
    await pasteText(user, "#ff0000 then #ff0000 then #ff0000");

    const panel = selectionPanel();
    expect(within(panel).getByText("1 of 3")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(within(selectionPanel()).getByText("2 of 3")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(within(selectionPanel()).getByText("1 of 3")).toBeInTheDocument();
  });

  it("wraps around from the first occurrence to the last", async () => {
    const user = renderApp();
    await pasteText(user, "#ff0000 #ff0000");

    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(within(selectionPanel()).getByText("2 of 2")).toBeInTheDocument();
  });

  it("shows an empty state when the text is cleared", async () => {
    const user = renderApp();
    await user.click(screen.getByRole("button", { name: /clear/i }));

    expect(screen.getByText(/no colours found yet/i)).toBeInTheDocument();
    expect(screen.getByText("Nothing Selected")).toBeInTheDocument();
  });

  it("switches sort mode", async () => {
    const user = renderApp();
    await user.click(screen.getByLabelText("DeltaE Sort"));
    expect(screen.getByLabelText("DeltaE Sort")).toBeChecked();
  });

  it("toggles the detail view", async () => {
    const user = renderApp();
    const toggle = screen.getByRole("button", { name: /details on/i });
    await user.click(toggle);
    expect(
      screen.getByRole("button", { name: /details off/i })
    ).toBeInTheDocument();
  });

  it("loads the sample palette", async () => {
    const user = renderApp();
    await user.click(screen.getByRole("button", { name: /sample palette/i }));
    expect((textarea() as HTMLTextAreaElement).value).toContain("--blue-100");
  });

  it("keeps the selected colour when unrelated text is edited", async () => {
    // Regression: ids are positional and reassigned on every parse, so
    // comparing by id alone let an edit silently move the selection to a
    // different colour that happened to inherit the id.
    const user = renderApp();
    await pasteText(user, "#ff0000 #00ff00 #0000ff");
    await user.click(screen.getByRole("button", { name: /select blue/i }));
    expect(within(selectionPanel()).getByText("#0000FF")).toBeInTheDocument();

    await pasteText(user, "#ff0000 #00ff00 #0000ff #ffff00");
    await user.click(screen.getByRole("button", { name: /select blue/i }));
    expect(within(selectionPanel()).getByText("#0000FF")).toBeInTheDocument();
  });

  it("falls back to the first colour when the selected one is deleted", async () => {
    const user = renderApp();
    await pasteText(user, "#ff0000 #0000ff");
    await user.click(screen.getByRole("button", { name: /select blue/i }));
    expect(within(selectionPanel()).getByText("#0000FF")).toBeInTheDocument();

    await pasteText(user, "#00ff00");
    expect(within(selectionPanel()).getByText("#00FF00")).toBeInTheDocument();
  });

  it("lets a colour name be typed into the compare field", async () => {
    // Regression: every keystroke was round-tripped through `new Color()`,
    // so typing "r" rewrote the field to "#R" and a name was unreachable.
    const user = renderApp();
    const field = screen.getByLabelText(/compare color/i);

    await user.clear(field);
    await user.type(field, "dodgerblue");

    expect(field).toHaveValue("dodgerblue");
  });

  it("keeps unparseable compare input on screen and flags it", async () => {
    const user = renderApp();
    const field = screen.getByLabelText(/compare color/i);

    await user.clear(field);
    await user.type(field, "notacolour");

    expect(field).toHaveValue("notacolour");
    expect(field).toHaveAttribute("aria-invalid", "true");
  });

  it("commits compare input once it parses", async () => {
    const user = renderApp();
    const field = screen.getByLabelText(/compare color/i);

    await user.clear(field);
    await user.type(field, "#0000ff");

    // Typing is never interrupted, even though "#000" parses on its own.
    expect(field).toHaveValue("#0000ff");
    expect(field).toHaveAttribute("aria-invalid", "false");
    // Setting a comparison colour turns on chromatic sorting.
    expect(screen.getByLabelText("Chromatic Sort")).toBeChecked();

    // Blurring normalises to the canonical name for that value.
    await user.tab();
    expect(field).toHaveValue("blue");
  });
});

import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const renderApp = () => {
  const user = userEvent.setup();
  render(<App />);
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
});

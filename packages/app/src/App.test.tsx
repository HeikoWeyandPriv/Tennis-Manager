import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("zeigt den Titel und den Platzhalter der Engine", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Tennis Manager" })).toBeInTheDocument();
    expect(screen.getByText("Verbunden mit: Tennis Manager Engine")).toBeInTheDocument();
  });
});

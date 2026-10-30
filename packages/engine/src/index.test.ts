import { describe, expect, it } from "vitest";
import { ENGINE_NAME } from "./index";

describe("Engine-Schnittstelle", () => {
  it("exportiert den Platzhalter", () => {
    expect(ENGINE_NAME).toBe("Tennis Manager Engine");
  });
});

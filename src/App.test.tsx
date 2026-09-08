import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("mostra il titolo", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /form schema builder/i })).toBeDefined();
  });
});

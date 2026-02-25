import { describe, expect, test } from "vitest";

import { siteConfig } from "../src/config/site";

describe("site config", () => {
  test("retains core brand direction", () => {
    expect(siteConfig.tagline).toBe("Warm Athletic Luxury");
  });

  test("exposes global navigation links", () => {
    expect(siteConfig.navLinks.length).toBeGreaterThanOrEqual(5);
  });
});

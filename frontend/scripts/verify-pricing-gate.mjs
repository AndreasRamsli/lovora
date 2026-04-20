import { chromium } from "playwright";

/* global console, document, getComputedStyle, localStorage, process, setTimeout */

const APP_URL = process.env.PRICING_GATE_URL || "http://127.0.0.1:4173";
const SWITCH_WIDTH = 44;
const SWITCH_HEIGHT = 24;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isNear(actual, expected, tolerance = 2) {
  return Math.abs(actual - expected) <= tolerance;
}

function isTransparent(color) {
  return !color || color === "rgba(0, 0, 0, 0)" || color === "transparent";
}

async function verifyTheme(page, theme) {
  await page.evaluate((selectedTheme) => {
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    document.body.classList.toggle("light", selectedTheme === "light");
  }, theme);

  const result = await page.evaluate(async () => {
    const mountId = "pricing-gate-check-root";
    document.getElementById(mountId)?.remove();

    const ReactModule = await import("/node_modules/.vite/deps/react.js");
    const React = ReactModule.default ?? ReactModule;
    const ReactDOMModule = await import(
      "/node_modules/.vite/deps/react-dom_client.js"
    );
    const createRoot =
      ReactDOMModule.createRoot ?? ReactDOMModule.default?.createRoot;
    const pricingModule = await import(
      "/src/components/WorkspaceChat/ChatContainer/PricingGate/index.jsx"
    );

    const host = document.createElement("div");
    host.id = mountId;
    host.style.position = "fixed";
    host.style.inset = "0";
    host.style.padding = "24px";
    host.style.zIndex = "999999";
    document.body.appendChild(host);

    const root = createRoot(host);
    root.render(
      React.createElement(pricingModule.default, {
        workspaceSlug: "demo-workspace",
        centered: true,
        onClose: () => {},
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    const headings = [...host.querySelectorAll("h2, h3")];
    const personalHeading = headings.find((node) =>
      node.textContent?.includes("Personal Entry")
    );
    const personalCard = personalHeading?.closest(
      "div[class*='rounded'][class*='border']"
    );
    const personalButton = [...host.querySelectorAll("button")].find((node) =>
      node.textContent?.includes("Start with Entry")
    );
    const divider = host.querySelector("[class*='h-px']");
    const switches = [...host.querySelectorAll('button[role="switch"]')].map(
      (node) => ({
        width: Math.round(node.getBoundingClientRect().width),
        height: Math.round(node.getBoundingClientRect().height),
        backgroundColor: getComputedStyle(node).backgroundColor,
      })
    );

    return {
      theme: document.documentElement.getAttribute("data-theme"),
      bodyHasLightClass: document.body.classList.contains("light"),
      personalButtonBg: personalButton
        ? getComputedStyle(personalButton).backgroundColor
        : null,
      personalCardBorder: personalCard
        ? getComputedStyle(personalCard).borderColor
        : null,
      dividerBg: divider ? getComputedStyle(divider).backgroundColor : null,
      switches,
    };
  });

  assert(result.theme === theme, `Expected ${theme} theme, got ${result.theme}`);
  assert(
    result.bodyHasLightClass === (theme === "light"),
    `Expected body light class to match ${theme}`
  );
  assert(
    !isTransparent(result.personalButtonBg),
    `Missing ${theme} personal button color`
  );
  assert(result.personalCardBorder, `Missing ${theme} personal card border`);
  assert(!isTransparent(result.dividerBg), `Missing ${theme} divider color`);
  assert(result.switches.length >= 2, `Expected ${theme} switches to render`);
  for (const pricingSwitch of result.switches) {
    assert(
      isNear(pricingSwitch.width, SWITCH_WIDTH) &&
        isNear(pricingSwitch.height, SWITCH_HEIGHT),
      `Expected ${theme} switch near ${SWITCH_WIDTH}x${SWITCH_HEIGHT}, got ${pricingSwitch.width}x${pricingSwitch.height}`
    );
    assert(
      !isTransparent(pricingSwitch.backgroundColor),
      `Missing ${theme} switch background color`
    );
  }

  return result;
}

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto(APP_URL, { waitUntil: "networkidle" });

  const dark = await verifyTheme(page, "dark");
  const light = await verifyTheme(page, "light");

  assert(
    dark.personalButtonBg !== light.personalButtonBg,
    "Expected neutral pricing button color to differ between dark and light themes"
  );
  assert(
    dark.personalCardBorder !== light.personalCardBorder,
    "Expected neutral pricing card border to differ between dark and light themes"
  );

  console.log(JSON.stringify({ dark, light }, null, 2));
} finally {
  await browser.close();
}

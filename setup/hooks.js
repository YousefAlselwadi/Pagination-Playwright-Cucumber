const { chromium } = require("@playwright/test");
const {
  Given,
  When,
  Then,
  Before,
  After,
  AfterAll,
  BeforeAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

const options = {
  headless: false,
  retries: 1,
  video: "on",
};

BeforeAll(async function () {
  global.browser = await chromium.launch(options);
});

Before(async function () {
  global.context = await global.browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  global.page = await global.context.newPage();
});

After(async function () {
  await global.page.close();
  await global.context.close();
});

AfterAll(async function () {
  await global.browser.close();
});
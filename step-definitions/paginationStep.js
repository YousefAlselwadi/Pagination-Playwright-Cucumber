const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test')
const PaginationPage = require('../pages/PaginationPage')

const paginationPage = new PaginationPage()


Given(/^the user is on "([^"]*)"$/, async function (url){
  await page.goto(url);
});

Then(/^the user should see the "([^"]*)" heading$/, async function (heading) {
  const $headingLocator = page.locator(paginationPage.headingLocator(heading));
  await expect($headingLocator).toBeVisible();
});


Then(/^the user should see the "([^"]*)" paragraph$/, async function (paragraph) {
  const $paragraphLocator = page.locator(paginationPage.content());
  await expect($paragraphLocator).toHaveText(paragraph);
});


Then(/^the user should see the "([^"]*)" button is disabled$/,async function (button) {
  const $buttonLocator = page.locator(paginationPage.buttons(button));
  await expect($buttonLocator).not.toBeEnabled()
});

Then(/^the user should see the "([^"]*)" button is enabled$/, async function (button) {
  const $buttonLocator = page.locator(paginationPage.buttons(button));
  await expect($buttonLocator).toBeEnabled()
});


When(/^the user clicks on the "([^"]*)" button$/, async function (button) {
  const $buttonLocator = page.locator(paginationPage.buttons(button));
  await $buttonLocator.click(button);
});


When(/^the user clicks on the "([^"]*)" button till it becomes disabled$/, async function (button) {
  await paginationPage.clickButtonTillDisabled(button);
});


Then(/^the user should see "([^"]*)" City with the info below and an image$/, async function (city, dataTable) {
  const cityInfo = dataTable.rowsHash();
  const expectedCity = cityInfo.City;
  const expectedCountry = cityInfo.Country;
  const expectedPopulation = cityInfo.Population;
  const expectedDetails = [expectedCity, expectedCountry, expectedPopulation];

  const $cityInfoLocators = page.locator(paginationPage.locators.info);

  for (let i = 0; i < expectedDetails.length; i++) {
    await expect($cityInfoLocators.nth(i)).toHaveText(expectedDetails[i]);
  }

  const cityImage = await paginationPage.cityImage(city);
  await expect(cityImage).toBeVisible();
});

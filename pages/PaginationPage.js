const locators = Object.freeze({
  mainHeading: '.is-size-3',
  subHeading: '#sub_heading',
  paragraphHeading: '#content',
  previousButton: '#previous',
  nextButton: '#next',
  info: '.city_info, .country_info, .population_info',

})

class PaginationPage {
  locators = locators

  headingLocator(heading) {
    switch (heading) {
      case 'Pagination':
        return this.locators.mainHeading
      case 'World City Populations 2022':
        return this.locators.subHeading
      default:
        throw new Error('Invalid heading provided')
    }
  }

  content() {
    return this.locators.paragraphHeading
  }

  buttons(button) {
    switch (button) {
      case 'Previous':
        return this.locators.previousButton
      case 'Next':
        return this.locators.nextButton
      default:
        throw new Error('Invalid button provided')
    }
  }
  async clickButtonTillDisabled(button) {
    const buttonLocator = page.locator(this.buttons(button));

    let isEnabled = await buttonLocator.isEnabled();

    while (isEnabled) {
      await buttonLocator.click();
      await page.waitForTimeout(100);
      isEnabled = await buttonLocator.isEnabled();
    }
  }

  async cityImage(city) {
    return page.locator(`img[alt="${city}"]`);
  }
}

module.exports = PaginationPage

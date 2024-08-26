const { expect } = require('@playwright/test');

class BookingPage {
  constructor(page) {
    this.page = page;
    this.destinationInput = "//input[@aria-label='Enter a destination or property']";
    this.countryLabel = (label) => `//*[text()='${label}']`;
    this.checkInBox = '#check-in-box';
    this.checkOutBox = '#check-out-box';
    this.popupSelector = '.Popup__content.Popup__content_Occupancy';
    this.nextMonthButton = 'button[aria-label="Next Month"]';
    this.dateSelector = (date) => `span:has-text("${date}")`;
    this.addChildButton1 = 'div:has-text("ChildrenAges 0-170") >> text=Add';
    this.addChildButton2 = 'div:has-text("ChildAges 0-171") >> text=Add';
    this.childAgeDropdown = (index) => `.DropdownInput__box:nth-of-type(${index})`;
    this.searchButton = '[data-test="SearchButtonBox"]';
    this.topReviewedText = '//div[text()="Top reviewed"]';
    this.hotelNameSelector = '#searchPageRightColumn .PropertyCard__Container .dynamic-style-typographystyle-5.a234d-a234d-box.a234d-inline.a234d-m-none';
  }

  async closePopup() {
    const elem = await this.page.waitForSelector("//*[text()='No thanks']", { timeout: 5000 }).catch(() => null);
    if (elem) {
      await elem.click();
    }
  }

  async searchDestination(destination, countryLabel) {
    await this.page.fill(this.destinationInput, destination);
    await this.page.getByLabel(countryLabel).nth(1).click();
  }

  async selectCheckInCheckOutDates(checkInDate, checkOutDate) {
    await this.page.locator(this.checkInBox).dblclick();
    await expect(this.page.locator(this.popupSelector)).toBeVisible();
    await this.page.evaluate(() => {
      const popupElement = document.querySelector('.Popup__content.Popup__content_Occupancy');
      if (popupElement) {
        popupElement.scrollTop = 0;
      }
    });
    await this.page.locator(this.nextMonthButton).click();
    await this.page.locator(this.dateSelector(checkInDate)).nth(1).click();
    await this.page.locator(this.checkOutBox).dblclick();
    await this.page.locator(this.dateSelector(checkOutDate)).nth(1).click();
  }

  async addChildrenAges(firstKidsAge, secondKidsAge) {
    await this.page.locator(this.addChildButton1).click();
    await this.page.locator(this.addChildButton2).click();
    await this.page.locator(this.childAgeDropdown(1)).selectOption({ value: firstKidsAge });
    await this.page.locator(this.childAgeDropdown(2)).selectOption({ value: secondKidsAge });
  }

  async searchHotels() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator(this.searchButton).click()
    ]);
    return newPage;
  }

  async selectHotel(newPage, hotelName) {
    await newPage.locator(this.topReviewedText).waitFor({ timeout: 6000 });
    const hotelElements = newPage.locator(this.hotelNameSelector);
    const count = await hotelElements.count();

    for (let i = 0; i < count; i++) {
      const hotelText = await hotelElements.nth(i).textContent();
      if (hotelText.trim() === hotelName) {
        await hotelElements.nth(i).click();
        break;
      }
    }
  }
}

module.exports = { BookingPage };

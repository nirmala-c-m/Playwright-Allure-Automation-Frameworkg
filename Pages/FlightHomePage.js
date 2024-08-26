class FlightHomePage {
    constructor(page) {
      this.page = page;
      this.noThanksButton = page.locator("//*[text()='No thanks']");
      this.flightsTab = page.getByRole('heading', { name: 'Flights', exact: true });
    }
  
    async open() {
      await this.page.goto('https://www.agoda.com/en-gb/');
      await this.page.waitForLoadState('networkidle');
    }
  
    async dismissPopup() {
      if (await this.noThanksButton.isVisible()) {
        await this.noThanksButton.click();
      }
    }
  
    async goToFlights() {
      await this.flightsTab.click();
    }
  }
  
  module.exports = FlightHomePage;
  
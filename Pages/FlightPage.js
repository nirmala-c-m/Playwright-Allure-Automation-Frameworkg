class FlightsPage {
    constructor(page) {
      this.page = page;
      this.flyingFromInput = page.getByPlaceholder('Flying from');
      this.flyingToInput = page.getByPlaceholder('Flying to');
      this.targetDate = (date) => page.getByLabel(date).getByText(date.split(' ')[1]);
      this.addAdultButton = page.getByLabel('Plus Adults (12yrs and above)');
      this.addChildButton = page.getByLabel('Plus Children (2-11yrs)');
      this.economyButton = page.getByRole('button', { name: 'Economy', exact: true });
      this.flightGrid = page.locator('[data-testid="flight-infinite-scroll"]');
    }
  
    async fillFlightDetails(data) {
      await this.flyingFromInput.click();
      await this.flyingFromInput.fill(data.flyingFrom);
      await this.page.getByText(data.flyingFromFull).click();
  
      await this.flyingToInput.click();
      await this.flyingToInput.fill(data.flyingTo);
      await this.page.getByText(data.flyingToFull).click();
  
      await this.targetDate(data.targetDate).click();
      await this.addAdultButton.click();
      await this.addChildButton.dblclick();
      await this.economyButton.click();
      await this.page.getByLabel('Flights', { exact: true }).locator('#Tabs-Container').click();
    }
  
    async selectFlight(data) {
      await this.page.waitForSelector('[data-testid="flight-infinite-scroll"]', { state: 'visible' });
      const flightCards = this.flightGrid.locator('div[data-component="flight-card"]');
      const flightCount = await flightCards.count();
  
      for (let i = 0; i < flightCount; i++) {
        const flightNameLocator = flightCards.nth(i).locator('.a922a-box.a922a-fill-inherit.a922a-text-inherit.a922a-flex.a922a-flex-row.a922a-gap-xs p');
        await flightNameLocator.waitFor({ state: 'visible', timeout: 30000 });
  
        const flightName = await flightNameLocator.innerText();
  
        if (flightName.includes('IndiGo')) {
          await flightCards.nth(i).locator('[data-testid="flightCard-flight-detail"]').click();
          const addToCartButton = flightCards.nth(i).locator('button:has-text("Add to cart")');
          await addToCartButton.click();
          break;
        }
      }
    }
  }
  
  module.exports = FlightsPage;
  
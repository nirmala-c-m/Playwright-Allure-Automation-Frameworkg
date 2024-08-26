class FlightBookingPage {
    constructor(page) {
      this.page = page;
      this.proceedToCartButton = page.getByRole('button', { name: 'Proceed to cart' });
      this.itemCheckbox = page.getByLabel('item checkbox');
      this.nextButton = page.getByRole('button', { name: 'Next', exact: true });
      this.firstNameInput = page.getByPlaceholder('First name');
      this.lastNameInput = page.getByPlaceholder('Last name');
      this.countryCodeSelect = page.getByLabel('Country code');
      this.mobileNumberInput = page.getByLabel('Mobile number');
      this.emailInput = page.getByLabel('Email');
      this.passengerFields = (index) => ({
        firstName: this.page.locator(`[id="passengers\\[${index}\\]\\.firstName"]`),
        lastName: this.page.locator(`[id="passengers\\[${index}\\]\\.lastName"]`),
        dateOfBirth: this.page.locator(`[id="passengers\\[${index}\\]\\.dateOfBirth"]`),
        nationality: this.page.locator(`#passengers\\[${index}\\]\\.nationalityFormik`),
        passportId: this.page.locator(`[id="passengers\\[${index}\\]\\.passport\\.id"]`),
        countryOfIssue: this.page.locator(`#passengers\\[${index}\\]\\.passport\\.countryOfIssueFormik`),
        expiryDate: this.page.locator(`[id="passengers\\[${index}\\]\\.passport\\.expiryDate"]`),
        gender: (gender) => this.page.getByLabel(gender, { exact: true }).nth(index)
      });
    }
  
    async fillBookingForm(data) {
      await this.proceedToCartButton.click();
      await this.itemCheckbox.check();
      await this.nextButton.click();
  
      await this.firstNameInput.fill(data.firstName);
      await this.lastNameInput.fill(data.lastName);
      await this.countryCodeSelect.selectOption(data.countryCode);
      await this.mobileNumberInput.fill(data.mobileNumber);
      await this.emailInput.fill(data.email);
  
      for (let i = 0; i < data.passengers.length; i++) {
        const fields = this.passengerFields(i);
        await fields.firstName.fill(data.passengers[i].firstName);
        await fields.lastName.fill(data.passengers[i].lastName);
        await fields.dateOfBirth.fill(data.passengers[i].dateOfBirth);
        await fields.nationality.selectOption({ label: data.passengers[i].nationality });
        await fields.passportId.fill(data.passengers[i].passportId);
        await fields.countryOfIssue.selectOption({ label: data.passengers[i].nationality });
        await fields.expiryDate.fill(data.passengers[i].passportExpiry);
  
        if (data.passengers[i].gender === 'Male') {
          await fields.gender('Male').check();
        } else {
          await fields.gender('Female').check();
        }
      }
  
      await this.page.getByRole('button', { name: 'Continue to add-ons' }).click();
      await this.page.getByRole('button', { name: 'Continue to payment' }).click();
    }
  }
  
  module.exports = FlightBookingPage;
  
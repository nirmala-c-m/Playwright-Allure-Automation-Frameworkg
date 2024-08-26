class LoginPage {
    constructor(page) {
      this.page = page;
      this.frameLocator = page.frameLocator('iframe[title="Universal login"]');
    }
  
    // Locators
    get createAccountButton() {
      return this.page.locator('button:has-text("Create account")');
    }
  
    get firstNameInput() {
      return this.frameLocator.locator('[placeholder="First name"]');
    }
  
    get lastNameInput() {
      return this.frameLocator.locator('[placeholder="Last name"]');
    }
  
    get emailInput() {
      return this.frameLocator.locator('[placeholder="Email"]');
    }
  
    get passwordInput() {
      return this.frameLocator.locator('[placeholder="Password"]', { exact: true });
    }
  
    get confirmPasswordInput() {
      return this.frameLocator.locator('[placeholder="Confirm Password"]');
    }
  
    get signUpButton() {
      return this.frameLocator.locator('button:has-text("Sign up")');
    }
  
    // Actions
    async clickCreateAccount() {
      await this.createAccountButton.click();
    }
  
    async fillFirstName(firstName) {
      await this.firstNameInput.click();
      await this.firstNameInput.fill(firstName);
    }
  
    async fillLastName(lastName) {
      await this.lastNameInput.click();
      await this.lastNameInput.fill(lastName);
    }
  
    async fillEmail(email) {
      await this.emailInput.click();
      await this.emailInput.fill(email);
    }
  
    async fillPassword(password) {
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
    }
  
    async fillConfirmPassword(confirmPassword) {
      await this.confirmPasswordInput.click();
      await this.confirmPasswordInput.fill(confirmPassword);
    }
  
    async clickSignUp() {
      await this.signUpButton.click();
    }
  }
  
  module.exports = { LoginPage };
  
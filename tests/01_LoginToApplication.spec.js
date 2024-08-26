const { test } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const fs = require('fs');

test('test', async ({ page }) => {
  const data = JSON.parse(fs.readFileSync('/home/nirmala/Playwright/utils/test-data/loginTestData.json', 'utf-8'));

  // Function to generate a random email
  const generateRandomEmail = () => {
    const timestamp = new Date().getTime();
    return `user${timestamp}@example.com`;
  };

  const randomEmail = generateRandomEmail();

  const loginPage = new LoginPage(page);

  await page.goto('https://www.agoda.com/en-gb/');
  await loginPage.clickCreateAccount();

  await loginPage.fillFirstName(data.firstName);
  await loginPage.fillLastName(data.lastName);
  await loginPage.fillEmail(randomEmail);
  await loginPage.fillPassword(data.password);
  await loginPage.fillConfirmPassword(data.confirmPassword);
  await loginPage.clickSignUp();
});

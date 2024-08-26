const { test, expect } = require('@playwright/test');
const fs = require('fs');
const HomePage = require('../Pages/FlightHomePage');
const FlightsPage = require('../Pages/FlightPage');
const BookingPage = require('../Pages/FlightBookingPage');

test('Booking Flight using Agoda', async ({ page }) => {
  const data = JSON.parse(fs.readFileSync('/home/nirmala/Playwright/utils/test-data/FlightBookingData.json', 'utf-8'));

  const homePage = new HomePage(page);
  const flightsPage = new FlightsPage(page);
  const bookingPage = new BookingPage(page);

  await homePage.open();
  await homePage.dismissPopup();
  await homePage.goToFlights();

  await flightsPage.fillFlightDetails(data);
  await flightsPage.selectFlight(data);

  console.log("Flight selection and addition to cart completed.");

  await bookingPage.fillBookingForm(data);
});

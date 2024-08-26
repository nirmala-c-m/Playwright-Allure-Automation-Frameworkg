import { test, expect } from '@playwright/test';
const fs = require('fs');
const { BookingPage } = require('../Pages/BookingHotel');

test('Booking Flight using Agoda', async ({ page }) => {
  // Load data from JSON file
  const data = JSON.parse(fs.readFileSync('/home/nirmala/Playwright/utils/test-data/HotelBookingData.json', 'utf-8'));
  
  const bookingPage = new BookingPage(page);

  await page.context().tracing.start({ screenshots: true, snapshots: true });
  await page.goto('https://www.agoda.com/en-gb/');

  // Close the popup
  await bookingPage.closePopup();

  // Use parameterized values from JSON
  await bookingPage.searchDestination(data.destination, data.countryLabel);
  await bookingPage.selectCheckInCheckOutDates(data.checkInDate, data.checkOutDate);
  await bookingPage.addChildrenAges(data.firstKidsAge, data.secondKidsAge);

  const newPage = await bookingPage.searchHotels();
  await bookingPage.selectHotel(newPage, data.hotelName);

  await page.context().tracing.stop({ path: 'trace.zip' });
});

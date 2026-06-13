// tests/scenario2-slider.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Scenario 2 - Drag & Drop Sliders', () => {

  test('should drag "Default value 15" slider to 95 and validate', async ({ page }) => {

    // Step 1: Open playground and click Drag & Drop Sliders
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();

    // Step 2: Select the "Default value 15" slider — it lives in #slider3
    const slider = page.locator('#slider3 input[type="range"]');
    const output = page.locator('#rangeSuccess');

    await slider.focus();
    await slider.press('Home'); // start from 0

    // Press ArrowRight one step at a time, stop exactly when value hits 95
    while (true) {
      const current = await output.textContent();
      if (current.trim() === '95') break;
      await slider.press('ArrowRight');
    }

    // Validate
    await expect(output).toHaveText('95');
  });

});
const { test, expect } = require('@playwright/test');

test.describe('Scenario 2 - Drag & Drop Sliders', () => {

  test('should drag "Default value 15" slider to 95 and validate', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();

    const slider = page.locator('#slider3 input[type="range"]');
    const output = page.locator('#rangeSuccess');

    await slider.focus();
    await slider.press('Home');

    while (true) {
      const current = await output.textContent();
      if (current.trim() === '95') break;
      await slider.press('ArrowRight');
    }

    await expect(output).toHaveText('95');
  });

});

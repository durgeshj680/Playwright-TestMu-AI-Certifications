const { test, expect } = require('@playwright/test');

test.describe('Scenario 1 - Simple Form Demo', () => {

  test('should enter message and validate it appears in Your Message panel', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    await page.getByRole('link', { name: 'Simple Form Demo' }).click();
    await page.waitForURL(/simple-form-demo/);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/simple-form-demo/);

    const message = process.env.TEST_MESSAGE || 'Welcome to TestMu AI';
    const msgInput = page.locator('input#user-message[placeholder="Please enter your Message"]');
    await msgInput.waitFor({ state: 'visible' });
    await msgInput.fill(message);
    await expect(msgInput).toHaveValue(message);

    const btn = page.locator('#showInput');
    await btn.click();

    const output = page.locator('#message');
    await expect(output).toHaveText(message);
  });

});

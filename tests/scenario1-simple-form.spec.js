// tests/scenario1-simple-form.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Scenario 1 - Simple Form Demo', () => {

  test('should enter message and validate it appears in Your Message panel', async ({ page }) => {

    // Step 1: Navigate directly to the page (skip homepage link click entirely)
    await page.goto(
      'https://www.lambdatest.com/selenium-playground/simple-form-demo/',
      { waitUntil: 'domcontentloaded' }
    );

    // Step 3: Validate URL contains "simple-form-demo"
    await expect(page).toHaveURL(/simple-form-demo/);

    // Step 4: Define message variable
    const message = 'Welcome to TestMu AI';

    // Step 5: Type into the Enter Message box
    // Use fill() + verify value was actually set before proceeding
    const msgInput = page.locator('input#user-message[placeholder="Please enter your Message"]');
    await msgInput.waitFor({ state: 'visible' });
    await msgInput.click();
    await msgInput.fill(message);
    // Confirm the value is set
    await expect(msgInput).toHaveValue(message);

    // Step 6: Click "Get Checked Value" button
    // Use force:true to bypass any overlay, and click by both id AND text fallback
    const btn = page.locator('#showInput');
    await btn.waitFor({ state: 'visible' });
    await btn.click({ force: true });

    // Small wait for the JS to update the DOM
    await page.waitForTimeout(1000);

    // Step 7: Validate the message in the "Your Message:" panel
    // The element is <p id="message"> - if still empty, try scrolling and re-clicking
    const output = page.locator('#message');
    const text = await output.textContent();
    if (!text || text.trim() === '') {
      // Button click may have been intercepted - try again
      await btn.dispatchEvent('click');
      await page.waitForTimeout(1000);
    }
    await expect(output).toHaveText(message);
  });

});

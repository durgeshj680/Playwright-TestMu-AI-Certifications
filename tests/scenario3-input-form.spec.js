const { test, expect } = require('@playwright/test');

test.describe('Scenario 3 - Input Form Submit', () => {

  test('should validate empty-submit error, fill form, and confirm success message', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    await page.getByRole('link', { name: 'Input Form Submit' }).click();

    await page.locator('button[type="submit"]:has-text("Submit")').click();

    const nameField = page.locator('input#name');
    const validationMsg = await nameField.evaluate((el) => el.validationMessage);
    expect(validationMsg).toBe('Please fill out this field.');

    await page.locator('input#name').fill('John Doe');
    await page.locator('input#inputEmail4').fill('johndoe@example.com');
    await page.locator('input#inputPassword4').fill('Test@1234');
    await page.locator('input#company').fill('TestMu Inc.');
    await page.locator('input#websitename').fill('https://testmuai.com');
    await page.locator('select[name="country"]').selectOption({ label: 'United States' });
    await page.locator('input#inputCity').fill('New York');
    await page.locator('input#inputAddress1').fill('123 Main Street');
    await page.locator('input#inputAddress2').fill('Suite 100');
    await page.locator('input#inputState').fill('NY');
    await page.locator('input#inputZip').fill('10001');

    await page.locator('button[type="submit"]:has-text("Submit")').click();

    const successMsg = page.locator('.success-msg');
    await successMsg.waitFor({ state: 'visible', timeout: 20000 });
    await expect(successMsg).toContainText(
      'Thanks for contacting us, we will get back to you shortly.'
    );
  });

});

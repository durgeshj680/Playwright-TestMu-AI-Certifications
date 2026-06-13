// tests/scenario3-input-form.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Scenario 3 - Input Form Submit', () => {

  test('should validate empty-submit error, fill form, and confirm success message', async ({ page }) => {

    // Step 1: Open Selenium Playground and click "Input Form Submit"
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    await page.getByRole('link', { name: 'Input Form Submit' }).click();
    await page.waitForTimeout(3000);
    // Step 2: Click "Submit" without filling any information
    await page.locator('button[type="submit"]:has-text("Submit")').click({ force: true });
    await page.waitForTimeout(2000);
    // Step 3: Assert "Please fill in this field." on the Name field
    const nameField = page.locator('input#name');
    const validationMsg = await nameField.evaluate((el) => el.validationMessage);
    expect(validationMsg).toBe('Please fill out this field.');
    
    await page.waitForTimeout(2000);
    // Step 4: Fill in Name, Email, and other fields
    await page.locator('input#name').fill('John Doe');
    await page.locator('input#inputEmail4').fill('johndoe@example.com');
    await page.locator('input#inputPassword4').fill('Test@1234');
    await page.locator('input#company').fill('TestMu Inc.');
    await page.locator('input#websitename').fill('https://testmuai.com');

    // Step 5: Select "United States" from Country dropdown using text property
    await page.locator('select[name="country"]').selectOption({ label: 'United States' });

    // Step 6: Fill remaining fields and click Submit
    await page.locator('input#inputCity').fill('New York');
    await page.locator('input#inputAddress1').fill('123 Main Street');
    await page.locator('input#inputAddress2').fill('Suite 100');
    await page.locator('input#inputState').fill('NY');
    await page.locator('input#inputZip').fill('10001');

    await page.locator('button[type="submit"]:has-text("Submit")').click({ force: true });
    await page.waitForTimeout(2000);
    // Step 7: Validate success message
    const successMsg = page.locator('.success-msg');
    await successMsg.waitFor({ state: 'visible', timeout: 20000 });
    await expect(successMsg).toContainText(
      'Thanks for contacting us, we will get back to you shortly.'
    );
  });

});
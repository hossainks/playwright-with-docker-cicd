import { test, expect } from '@applitools/eyes-playwright/fixture';

test('input fields', async ({ page }, testInfo) => {
    await page.goto('/');
    if (testInfo.project.name === 'mobile') {
        await page.locator('[data-name="menu-2"]').click();
    }
    await page.getByText('Form').first().click();
    await page.getByText('Form Layouts').click();
    if (testInfo.project.name === 'mobile') {
        await page.locator('[data-name="menu-2"]').click();
    }
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" });
    await page.waitForTimeout(2000);
    await usingTheGridEmailInput.fill('test@test.com');
    await page.waitForTimeout(5000);
});
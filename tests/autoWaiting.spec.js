import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(process.env.URL, { waitUntil: "domcontentloaded", timeout: 5000 })
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test("Auto Waiting", async ({ page }) => {
    await page.getByRole("button", { name: "Button Triggering AJAX Request" }).click()
    const successButton = page.locator(".bg-success")

    // await successButton.waitFor()

    const getText = await successButton.textContent()
    expect(getText).toEqual("Data loaded with AJAX get request.")

    // await expect(successButton).toHaveText("Data loaded with AJAX get request.")
    await successButton.waitFor()
})

test("Alternative Waiting", async ({ page }) => {
    // test.setTimeout(30000)
    test.slow()

    await page.getByRole("button", { name: "Button Triggering AJAX Request" }).click()
    const successButton = page.locator(".bg-success")
    await successButton.click()
})
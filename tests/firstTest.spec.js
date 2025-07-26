import { test } from '@playwright/test'

// It will run before each test
/* test.beforeEach("", async () => {
    await page.goto("http://localhost:4200", { waitUntil: "domcontentloaded" })
    await page.getByText("Forms").click()
})
 */

// For Single Test

/* test("First Test", async ({ page }) => {
    await page.goto("http://localhost:4200", { waitUntil: "domcontentloaded" })
    await page.getByText("Forms").click()
    await page.getByTitle("Form Layouts").click()
}) */

// For Grouping 

/* test.describe("Many Tests", async () => {
    test("One test", () => {

    })
    test("Two test", () => {

    })
})

test.describe("Many Tests", async () => {
    test("Three test", () => {

    })
    test("Four test", () => {

    })
}) */
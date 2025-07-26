import { expect, test } from '@playwright/test'
import { race } from 'core-js/fn/promise'

test.beforeEach("", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })
    await page.getByText("Forms").click()
})

test("First Test", async ({ page }) => {
    await page.getByTitle("Form Layouts").click()
})

test("Second Test", async ({ page }) => {
    await page.getByTitle("Datepicker").click()
})

test("Locator Syntax Rules", async ({ page }) => {
    await page.getByTitle("Form Layouts").click()

    // By tagName and Value
    await page.locator("input[placeholder='Jane Doe']").click()

    // By ID
    await page.locator("#inputEmail1").click()

    // By Classvalue
    const byClass = page.locator(".shape-rectangle")

    // By attribute
    await page.locator("[placeholder='Jane Doe']").click()

    // By Partial text
    await page.locator(":text('Using')").isVisible()

    // By Full text
    await page.locator(":text('Using the Grid')").isVisible()

})

test("User Faching Locator", async ({ page }) => {
    await page.getByTitle("Form Layouts").click()

    // By TestBox
    await page.getByRole("textbox", { name: "Jane Doe" }).click()

    // By Button
    await page.getByRole("button", { name: "Submit" }).first().click()

    // By Label
    await page.getByLabel("Email").first().click()

})

test("Locating Child Elements", async ({ page }) => {
    await page.getByTitle("Form Layouts").click()

    await page.locator("nb-card nb-radio :text-is('Option 1')").click()
    await page.locator("nb-card").locator("nb-radio").locator(":text-is('Option 1')").click()
    await page.locator("nb-card form div button[type='submit']").first().click()
    await page.locator("nb-card").getByRole("button", { name: "Sign in" }).first().click()
    await page.locator("nb-card").nth(2).getByRole("button").click()
})

test("Locating Parent Elements", async ({ page }) => {
    await page.getByTitle("Form Layouts").click()
    await page.locator("nb-card", { hasText: "Using the Grid" }).click()
    await page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" }).click()

    await page.locator("nb-card", { has: page.locator("#inputEmail1") }).click()
    await page.locator("nb-card").filter({ hasText: "sing the Grid" }).getByRole("textbox", { name: "Email" }).click()
    await page.locator("nb-card").filter({ has: page.locator(".status-danger") }).click()
    await page.locator("nb-card").filter({ has: page.locator(".status-danger") }).locator("#exampleInputPassword1").click()
    await page.locator("nb-card").filter({ has: page.getByRole("checkbox") }).filter({ has: page.getByText("Sign In") }).getByRole("textbox", { name: "Email" }).click()

    await page.locator(":text-is('Using the Grid')").locator('..').getByRole("textbox", { name: "Email" }).click()
})

test("Reusing the Locator", async ({ page }) => {
    await page.getByTitle("Form Layouts").click()
    // const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" })
    // await basicForm.getByRole("textbox", { name: "Email" }).fill("test@test.com")
    // await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123")
    // await basicForm.getByRole("button").click()

    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" })
    const emailForm = basicForm.getByRole("textbox", { name: "Email" });

    await emailForm.fill("test@test.com");
    await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123");
    await basicForm.locator("nb-checkbox").click();
    await basicForm.getByRole("button").click()
})

test("Extracting Values", async ({ page }) => {
    await page.getByTitle("Form Layouts").click()

    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" })
    const buttonText = await basicForm.getByRole("button").textContent()
    expect(buttonText).toEqual('Submit')

    const radioButtons = await page.locator("nb-radio").allTextContents()
    expect(radioButtons).toContain("Option 2")

    // Input Field

    const emailField = basicForm.getByRole("textbox",{name:"Email"})
    await emailField.fill("test@test.com")
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual("test@test.com")

    const getPlaceHolderValue = await emailField.getAttribute("placeholder")
    expect(getPlaceHolderValue).toEqual("Email")
})

test("Assertions", async ({ page }) => {
    await page.getByTitle("Form Layouts").click()

    const button = page.locator("nb-card").filter({ hasText: "Basic form" }).getByRole("button")
    const buttonText = await button.textContent()

    // General Assertion 
    expect(buttonText).toEqual("Submit");

    const value = 5
    expect(value).toEqual(5)

    // Locator Seertion
    await expect(button).toHaveText("Submit")

    // SoftAssertion 
    await expect.soft(button).toHaveText("Submit")
    await button.click()
  })
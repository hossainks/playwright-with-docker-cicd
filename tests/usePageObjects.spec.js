import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pagemanager";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    /* try {
        await page.goto("http://localhost:4200/");
    } catch (error) {
        console.log("Error Loading to the page:", error);
    } */

});

test.describe("running test", async () => {
    test.describe.configure({ retries: 2 })
    test("Navigate to From Page @regression", async ({ page }) => {
        const pm = new PageManager(page);
        await pm.navigateTo().fromLayoutsPage();
        await pm.navigateTo().datepickerPage();
        await pm.navigateTo().toastrPage();
        await pm.navigateTo().tooltipPage();
        await pm.navigateTo().smartTablePage();
    });

    test("Fill The Grids @smoke", async ({ page }) => {
        const randomFullName = faker.person.fullName()
        const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(1000)}@test.com`
        const pm = new PageManager(page);
        await pm.navigateTo().fromLayoutsPage();
        await pm.fromLayout().submitTheGrid(randomEmail, process.env.PASSWORD, "Option 1")
        await page.screenshot({ "path": "screenshots/fromLayoutPage.png" }
        )
        const buffer = await page.screenshot()
        // console.log(buffer.toString('base64'));
        await pm.fromLayout().fillInlineFrom(randomFullName, randomEmail, true)
        await page.locator("nb-card", { hasText: "Inline form" }).screenshot({ "path": "screenshots/inlineForm.png" })
    });

    test.skip("Select Dates", async ({ page }, testInfo) => {
        if (testInfo.retry) {
            // Do some task 
        }
        const pm = new PageManager(page);
        await pm.navigateTo().datepickerPage();
        await pm.datePicker().commonDatePicker(5)
        await pm.datePicker().rangeDatePicker(10, 15)
    });
})
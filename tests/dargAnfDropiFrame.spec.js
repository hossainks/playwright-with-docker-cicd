import { expect } from '@playwright/test'
import {test} from '../test-options'

test("Drag and Drop iFrame", async ({ page ,globalsQaURL}) => {
    await page.goto(globalsQaURL, { waitUntil: "domcontentloaded" })
    const frame = page.frameLocator("[rel-title='Photo Manager'] iframe")

    await frame.locator("li", { hasText: "High Tatras 2" }).dragTo(
        frame.locator("#trash")
    )

    // More precious control
    await frame.locator("li", { hasText: "High Tatras 4" }).hover()
    await page.mouse.down()
    await frame.locator("#trash").hover()
    await page.mouse.up()

    await expect(frame.locator("#trash li h5")).toHaveText(["High Tatras 2", "High Tatras 4"])
})

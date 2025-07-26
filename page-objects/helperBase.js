export class HelperBase {
    constructor(page) {
        this.page = page
    }
    async waitForNumberOfSecs(timeInSeconds) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}
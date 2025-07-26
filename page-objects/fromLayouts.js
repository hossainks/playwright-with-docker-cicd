export class FromLayoutsPage {
    constructor(page) {
        this.page = page;
    }

    async submitTheGrid(email, password, optionText) {
        this.gridFrom = this.page.locator("nb-card", { hasText: "Using the Grid" });
        await this.page.locator("#inputEmail1").fill(email);
        await this.page.locator("#inputPassword2").fill(password);
        await this.page.getByRole("radio", { name: optionText }).check({ force: true })
        await this.gridFrom.getByRole("button").click()
    }
    /**
     * This method will fill out the Inline From
     * @param {*} name 
     * @param {*} email 
     * @param {*} rememberMe 
     */
    async fillInlineFrom(name, email, rememberMe) {
        this.inlineFrom = this.page.locator("nb-card", { hasText: "Inline form" });
        await this.inlineFrom.getByPlaceholder("Jane Doe").fill(name);
        await this.inlineFrom.getByPlaceholder("Email").fill(email)
        if (rememberMe) {
            await this.inlineFrom.getByRole("checkbox").check({ force: true })
        }
        await this.inlineFrom.getByRole("button").click()

    }

}
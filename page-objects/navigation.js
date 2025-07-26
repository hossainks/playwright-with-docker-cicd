import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
    super(page) {
        page
    }

    async fromLayoutsPage() {
        await this.checkGroupMenu("Forms");
        await this.page.getByTitle("Form Layouts").click();
        await this.waitForNumberOfSecs(2)
    }

    async datepickerPage() {``
        /* const expandedValue = await this.page.getAttribute("[title='Forms']", "aria-expanded");
        if (expandedValue === "false") {
            await this.page.getByText("Forms").click();
        } */
        await this.checkGroupMenu("Forms");
        await this.page.getByText("Datepicker").click();
        await this.waitForNumberOfSecs(2)
    }
    async toastrPage() {
        await this.checkGroupMenu("Modal & Overlays");
        await this.page.getByTitle("Toastr").click();
        await this.waitForNumberOfSecs(2)
    }
    async tooltipPage() {
        await this.checkGroupMenu("Modal & Overlays");
        await this.page.getByText("Tooltip").click();
        await this.waitForNumberOfSecs(2)
    }
    async smartTablePage() {
        await this.checkGroupMenu("Tables & Data");
        await this.page.getByText("Smart Table").click();
        await this.waitForNumberOfSecs(2)
    }

    async checkGroupMenu(groupName) {
        const locator = this.page.getByTitle(groupName);
        const expandedValue = await locator.getAttribute("aria-expanded");
        if (expandedValue === "false") {
            await locator.click();
        }
    }
}

// export default NavigationPage;
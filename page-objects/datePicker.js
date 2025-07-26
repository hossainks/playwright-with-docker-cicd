import { expect } from "@playwright/test";

export class DatePicker {
    constructor(page) {
        this.page = page;
    }

    async commonDatePicker(dateNumber) {
        const datePicker = this.page.getByPlaceholder("Form Picker");
        await datePicker.click();
        const selectedDate = await this.selectSingleDate(dateNumber)
        await expect(datePicker).toHaveValue(selectedDate);
    }

    async rangeDatePicker(startDate, EndDate) {
        const datePicker = this.page.getByPlaceholder("Range Picker");
        await datePicker.click();
        const selectedStartDate = await this.selectSingleDate(startDate)
        const selectedEndDate = await this.selectSingleDate(EndDate)
        const dateAssert = `${selectedStartDate} - ${selectedEndDate}`
        await expect(datePicker).toHaveValue(dateAssert);
    }

    async selectSingleDate(singleDate) {

        // Select the next month
        const date = new Date();
        date.setDate(date.getDate() + singleDate);
        const expectedDate = date.getDate().toString();
        console.log(expectedDate);

        // Get the date
        const shortMonth = date.toLocaleString("default", { month: "short" });
        const longMonth = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();

        let getCalnderDate = await this.page.locator("nb-calendar-view-mode button[status='basic']").textContent();
        const expectedMonthLong = ` ${longMonth} ${year} `;

        while (!getCalnderDate.includes(expectedMonthLong)) {
            const nextButton = this.page.locator("[data-name='chevron-right']");
            await nextButton.click();
            getCalnderDate = await this.page.locator("nb-calendar-view-mode button[status='basic']").textContent();
        }

        await this.page.locator(".day-cell.ng-star-inserted").getByText(expectedDate, { exact: true }).click()
        return `${shortMonth} ${expectedDate}, ${year}`
    }
}

// export default NavigationPage;
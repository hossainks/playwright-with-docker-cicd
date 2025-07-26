
import { NavigationPage } from "../page-objects/navigation";
import { FromLayoutsPage } from "../page-objects/fromLayouts"
import { DatePicker } from '../page-objects/datePicker'

export class PageManager {
    constructor(page) {
        this.page = page
        this.navigateToPage = new NavigationPage(this.page)
        this.fromLayoutPage = new FromLayoutsPage(this.page)
        this.datePickerPage = new DatePicker(this.page)
    }

    navigateTo() {
        return this.navigateToPage
    }
    fromLayout() {
        return this.fromLayoutPage
    }
    datePicker() {
        return this.datePickerPage
    }
}
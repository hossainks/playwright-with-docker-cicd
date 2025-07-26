const { test: base } = require('@playwright/test');
import { PageManager } from './page-objects/pagemanager';

const test = base.extend({
  globalsQaURL: ['', { option: true }],
  fromLayoutPage: async ({ page }, use) => {
    await page.goto("/");
    await page.getByTitle("Forms").click();
    await page.getByText("Form Layouts").click();
    await use('');
  },
  pagemanager: async ({ page, fromLayoutPage }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  }
});

module.exports = { test };

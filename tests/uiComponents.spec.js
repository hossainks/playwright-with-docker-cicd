import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Form Layout Page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByTitle("Form Layouts").click();
  });

  test("Input Fields", async ({ page }) => {
    const gridFrom = page.locator("nb-card", { hasText: "Using the Grid" });
    const emailInput = gridFrom.getByRole("textbox", { name: "Email" });

    await emailInput.fill("test@test.com");
    await emailInput.clear();
    await emailInput.pressSequentially("test2@test.com", { delay: 100 });

    // Get Input Value
    // const email = await emailInput.inputValue()
    // expect(email).toEqual("test2@test.com")

    await expect(emailInput).toHaveValue("test2@test.com");
  });

  test("Radio Buttons", async ({ page }) => {
    const gridFrom = page.locator("nb-card", { hasText: "Using the Grid" });
    // const firstRadio = gridFrom.getByLabel("Option 1")
    const firstRadio = gridFrom.getByRole("radio", { name: "Option 1" });
    const secondRadio = gridFrom.getByRole("radio", { name: "Option 2" });

    await firstRadio.check({ force: true });

    let status = await firstRadio.isChecked();
    expect(status).toBeTruthy();

    await expect(firstRadio).toBeChecked();

    await secondRadio.check({ force: true });
    await expect(secondRadio).toBeChecked();

    status = await firstRadio.isChecked();
    expect(status).toBeFalsy();
  });

  test.only("Visual Testing with AI", async ({ page }) => {
    const gridFrom = page.locator("nb-card", { hasText: "Using the Grid" });
    const radioCheck = gridFrom.getByRole("radio", { name: "Option 2" });

    await radioCheck.check({ force: true });
    let status = await radioCheck.isChecked();

    // Visual Testing
    await expect(gridFrom).toHaveScreenshot({maxDiffPixels: 50});

  });
});

test.describe("Modal & Overlays", async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByTitle("Toastr").click();
  });

  test("CheckBox Interact", async ({ page }) => {
    const checkBox1 = page.getByRole("checkbox", { name: "Hide on click" });
    const checkBox2 = page.getByRole("checkbox", {
      name: "Prevent arising of duplicate toast",
    });

    // await checkBox1.uncheck({ force: true })
    // await checkBox2.check({ force: true })

    const allCheckBox = await page.getByRole("checkbox").all();

    for (let checkbox of allCheckBox) {
      if (await checkbox.isChecked()) {
        await checkbox.uncheck({ force: true });
      }
    }
  });
});

test.describe("List and Dropdowns", async () => {
  test("Dropdowns", async ({ page }) => {
    const dropDownButon = page.locator("ngx-header nb-select");
    await dropDownButon.click();
    const allDropDown = page.locator("nb-option-list nb-option");
    await expect(allDropDown).toHaveText([
      "Light",
      "Dark",
      "Cosmic",
      "Corporate",
    ]);
    await allDropDown.filter({ hasText: "Cosmic" }).click();

    const header = page.locator("nb-layout-header");
    await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

    const colors = {
      Light: "rgb(255, 255, 255)",
      Dark: "rgb(34, 43, 69)",
      Cosmic: "rgb(50, 50, 89)",
      Corporate: "rgb(255, 255, 255)",
    };

    await dropDownButon.click();
    for (const color in colors) {
      await allDropDown.filter({ hasText: color }).click();
      await expect(header).toHaveCSS("background-color", colors[color]);
      if (color != "Corporate") {
        await dropDownButon.click();
      }
    }
  });
});

test.describe("ToolTips", async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();
  });
  test("Toolstip Validation", async ({ page }) => {
    const tooltipcard = page.locator("nb-card", { name: "Tooltip Placements" });
    await tooltipcard.getByRole("button", { name: "Top" }).hover();

    const tooltip = await page.locator("nb-tooltip").textContent();
    expect(tooltip).toContain("This is a tooltip");
  });
});

test("Dialog Box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toContain("Are you sure you want to delete?");
    dialog.accept();
  });
  const firstTrashIcon = page
    .locator("tbody tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash");
  await firstTrashIcon.click();

  expect(firstTrashIcon).not.toHaveText("mdo@gmail.com");
});

/* test("Web Tables Practise", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    const row = page.locator("tbody tr", { hasText: "twitter@outlook.com" })
    const firstTrashIcon = row.locator('.nb-edit')
    await firstTrashIcon.click()

    const editButton = page.locator("input-editor input[placeholder='Age']")
    await editButton.fill("25")
    
    await page.locator(".nb-checkmark").click()
    const getAge = await row.locator("div[ng-reflect-ng-switch='number']").nth(1).textContent()
    console.log(getAge);
    expect(getAge).toEqual("25")
}) */

test("Web Tables part 1", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  const targatedRow = page.getByRole("row", { name: "twitter@outlook.com" });
  const editButton = targatedRow.locator(".nb-edit");
  await editButton.click();

  const ageInput = page.locator("input-editor").getByPlaceholder("Age");
  await ageInput.fill("35");

  await page.locator(".nb-checkmark").click();

  //await page.getByRole("list").click()
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  // const rowNumber = page.getByRole("row").locator("div[ng-reflect-ng-switch='number']")
  // const rowById = rowNumber.nth(0).getByText("11")
  // await rowById.locator(".nb-edit").click()

  const rowNumber = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth("1").getByText("11") });
  await rowNumber.locator(".nb-edit").click();
  // console.log(rowById);

  const emailInput = page.locator("input-editor").getByPlaceholder("E-mail");
  await emailInput.fill("test@test.com");
  await page.locator(".nb-checkmark").click();
  await expect(rowNumber.locator("td").nth(5)).toHaveText("test@test.com");
});

test("Web Tables part 2", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();
  const searchInput = page.getByPlaceholder("Age");

  const ages = ["20", "30", "40", "200"];

  for (let age of ages) {
    await searchInput.fill(age);
    await page.waitForTimeout(1000); // Wait for the table to update
    const ageRows = page.locator("tbody tr");

    for (let row of await ageRows.all()) {
      if (age === "200") {
        const rowData = await page.locator("tbody tr").textContent();
        expect(rowData).toContain("No data found");
      } else {
        const rowAge = await row.locator("td").last().textContent();
        expect(rowAge).toContain(age);
      }
    }
  }
});

test("Date Picker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const datePicker = page.getByPlaceholder("Form Picker");
  await datePicker.click();

  const targerCell = page
    .locator("[class='day-cell ng-star-inserted']")
    .getByText("1", { exact: true });
  await targerCell.click();

  await expect(datePicker).toHaveValue("Jul 1, 2025");
});

/* test("Date Picker Part 2", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  // Click On Date picker Locator
  const datePicker = page.getByPlaceholder("Form Picker");
  await datePicker.click();

  // Select the next month
  const date = new Date();
  date.setDate(date.getDate() + 100);
  const expectedDate = date.getDate().toString();
  console.log(expectedDate);

  // Get the short month name and year
  const shortMonth = date.toLocaleString("default", { month: "short" });
  const fullMonth = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const monthYear = `${fullMonth} ${year}`;
  console.log(monthYear);

  let getCalnderDate = await page.locator("nb-calendar-view-mode button[status='basic']").textContent();


  if (getCalnderDate.trim() === monthYear) {
    const targerCell = page
      .locator("[class='day-cell ng-star-inserted']")
      .getByText(expectedDate, { exact: true });
    await targerCell.click();

  } else {
    let startDate = 0
    while (startDate < 12) {
      const nextButton = page.locator("[data-name='chevron-right']");
      await nextButton.click();
      getCalnderDate = await page.locator("nb-calendar-view-mode button[status='basic']").textContent();
      if (getCalnderDate.trim() === monthYear) {
        const targerCell = page
          .locator("[class='day-cell ng-star-inserted']")
          .getByText(expectedDate, { exact: true });
        await targerCell.click();
        break;
      }
      startDate++
    }
  }

  await expect(datePicker).toHaveValue(
    `${shortMonth} ${expectedDate}, ${year}`
  );
});
 */

test("Date Picker Part 2 Tutorial Version", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  // Click On Date picker Locator
  const datePicker = page.getByPlaceholder("Form Picker");
  await datePicker.click();

  // Select the next month
  const date = new Date();
  date.setDate(date.getDate() + 500);
  const expectedDate = date.getDate().toString();
  console.log(expectedDate);

  // Get the short month name and year
  const shortMonth = date.toLocaleString("default", { month: "short" });
  const longMonth = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  let getCalnderDate = await page.locator("nb-calendar-view-mode button[status='basic']").textContent();
  const expectedMonthLong = ` ${longMonth} ${year} `;

  while (!getCalnderDate.includes(expectedMonthLong)) {
    const nextButton = page.locator("[data-name='chevron-right']");
    await nextButton.click();
    getCalnderDate = await page.locator("nb-calendar-view-mode button[status='basic']").textContent();
  }

  const targerCell = page
    .locator("[class='day-cell ng-star-inserted']")
    .getByText(expectedDate, { exact: true });
  await targerCell.click();


  await expect(datePicker).toHaveValue(
    `${shortMonth} ${expectedDate}, ${year}`
  );
});


test("Sliders ", async ({ page }) => {

  // Update attribute of the slider
  const tempGauge = page.locator("nb-tab[tabtitle=Temperature] circle");
  await tempGauge.evaluate((el) => {
    // el.setAttribute("r", "20");
    el.setAttribute("cx", "232.630");
    el.setAttribute("cy", "232.630");
  });
  await tempGauge.click();

  // Mouse Movement
  const tempBox = page.locator("nb-tab[tabtitle=Temperature] ngx-temperature-dragger");
  await tempBox.scrollIntoViewIfNeeded();

  const box = await tempBox.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  console.log(x, y);
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();

  expect(tempBox).toContainText("30");
});

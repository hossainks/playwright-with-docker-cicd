import { test } from "../test-options.js";
import { faker } from "@faker-js/faker";

test("Parameterized methods", async ({ pagemanager }) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(1000)}@test.com`
    await pagemanager.fromLayout().submitTheGrid(randomEmail, process.env.PASSWORD, "Option 1")
    await pagemanager.fromLayout().fillInlineFrom(randomFullName, randomEmail, true)
});

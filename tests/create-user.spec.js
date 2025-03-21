import { test, expect } from "@playwright/test";

test("User can create account, log in and log out", async ({ page }) => {
	// Login as Charlie
	await page.goto("http://localhost:3000/");
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).click();
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).fill("Charlie");
	await page.getByRole("button", { name: "SUBMIT" }).click();

	// Logout
	await page.getByRole("link", { name: "Log out" }).click();
});

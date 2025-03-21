import { test, expect } from "@playwright/test";

test("User can send friend requests, accept them, view confirmation, and see eachothers reading list", async ({
	page,
}) => {
	// Create user Alpha and log out
	await page.goto("http://localhost:3000/");
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).click();
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).fill("Alpha");
	await page.getByRole("button", { name: "SUBMIT" }).click();
	await page.waitForResponse((response) => response.url().includes("/add"));
	await page.goto("http://localhost:3000/library-interior/");
	await page.getByRole("link", { name: "Log out" }).click();

	// Create user Beta
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).click();
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).fill("Beta");
	await page.getByRole("button", { name: "SUBMIT" }).click();
	await page.waitForResponse((response) => response.url().includes("/add"));
	await page.goto("http://localhost:3000/library-interior/");

	// Send friend request to Alpha and log out
	await page.getByText("My Friends").click();
	await page.getByText("My Friends").click();
	await page.getByText("Add friend").click();
	await page.getByRole("link", { name: "Alpha" }).click();
	await page.waitForResponse((response) => response.url().includes("/update-inbox"));
	await page.getByRole("link", { name: "Log out" }).click();

	// Log in as Alpha
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).click();
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).fill("Alpha");
	await page.getByRole("button", { name: "SUBMIT" }).click();
	await page.waitForResponse((response) => response.url().includes("/add"));
	await page.goto("http://localhost:3000/library-interior/");

	// Accept friend request from Beta in inbox
	await page.getByText("My Inbox").click();
	await page.getByRole("button", { name: "✓" }).click();
	await page.waitForResponse((response) => response.url().includes("/update-inbox"));
	await page.getByRole("button", { name: "✕" }).click();

	// View Beta's reading list and log out
	await page.getByText("My Friends").click();
	await page.getByRole("link", { name: "Beta" }).click();
	await expect(page.getByRole("heading", { name: "Beta's Reading List" })).toBeVisible();
	await page.getByRole("link", { name: "Log out" }).click();

	// Log in as Beta
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).click();
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).fill("Beta");
	await page.getByRole("button", { name: "SUBMIT" }).click();
	await page.waitForResponse((response) => response.url().includes("/add"));
	await page.goto("http://localhost:3000/library-interior/");

	// Check confirmation message in inbox
	await page.getByText("My Inbox").click();
	await page.getByText("Alpha accepted your friend").click();
	await page.locator(".delete-message-btn").click();
	await page.getByRole("button", { name: "✕" }).click();

	// View Alpha's reading list
	await page.getByText("My Friends").click();
	await page.getByRole("link", { name: "Alpha" }).click();
	await page.getByRole("heading", { name: "Alpha's Reading List" }).click();
});

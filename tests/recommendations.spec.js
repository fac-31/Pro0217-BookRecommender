import { test, expect } from "@playwright/test";

test("Users can like books, see them in their reading list, and receive personalized recommendations.", async ({
	page,
}) => {
	// Login
	await page.goto("http://localhost:3000/");
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).click();
	await page.getByRole("textbox", { name: "ENTER YOUR FIRST NAME BELOW" }).fill("Oskar");
	await page.getByRole("button", { name: "SUBMIT" }).click();
	await page.waitForResponse((response) => response.url().includes("/add"));

	// Enter a preference
	await page.getByRole("textbox", { name: "Enter your book preferences" }).click();
	await page.getByRole("textbox", { name: "Enter your book preferences" }).fill("happy books");
	await page.getByRole("button", { name: "SUBMIT" }).click();

	// Like a book from those recommended
	const book = await page.locator(".book").first();
	const bookId = await book.getAttribute("bookid");
	await book.click();
	await book.getByRole("button", { name: "✓" }).click();
	await page.waitForResponse((response) => response.url().includes("/update-book"));

	// Go to my books and see the book previously liked
	await page.getByRole("link", { name: "My Books" }).click();
	const likedBook = await page.locator("#my-books-container .book").first();
	const likedBookId = await likedBook.getAttribute("bookid");
	expect(likedBookId).toBe(bookId);

	// Books based on the users reading list appears
	await expect(page.getByText("Based on your reading list")).toBeVisible({ timeout: 30000 });
	const firstBook = page.locator("#my-recommendations-container .book").first();
	await expect(firstBook).toBeVisible();
});

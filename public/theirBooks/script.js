const username = localStorage.getItem("friendUsername");
const userId = localStorage.getItem("friendUserID");
if (username) {
	document.getElementById("readingListTitle").textContent = `${username}'s Reading List`;
	document.querySelector(".dialogue-div").innerHTML = `<p>Here's ${username}'s reading list!</p>`;
}

const createMyBooksElements = (books, bookContainer, id_reason_dict) => {
	for (let i = 0; i < books.length; i++) {
		const book = books[i];
		createBookElement(bookContainer, book, id_reason_dict[book.id]);
	}
};

async function fetchUsersBooks() {
	const userInfo = await fetch(`/users/${userId}`);
	if (!userInfo.ok) {
		console.error("Failed to fetch user info");
		return;
	}
	const userData = await userInfo.json();

	// Fetch book details using the likes array
	const book_ids = userData.likes.map((bookData) => bookData.id);
	const response = await fetch("/books/fetchBooksByIDs", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ids: book_ids }),
	});

	if (!response.ok) {
		console.error("Failed to fetch book details");
		return;
	}

	const id_reason_dict = Object.fromEntries(userData.likes.map(({ id, reason }) => [id, reason]));
	const books = await response.json();
	const bookContainer = document.getElementById("my-books-container");
	bookContainer.replaceChildren(); //delete all current children (in case this container is being refreshed)
	createMyBooksElements(books, bookContainer, id_reason_dict);
}

fetchUsersBooks();

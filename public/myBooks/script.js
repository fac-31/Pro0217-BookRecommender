const username = localStorage.getItem("username");
const userId = localStorage.getItem("userID");

const createMyBooksElements = (books, bookContainer, id_reason_dict) => {
	for (let i = 0; i < books.length; i++) {
		const book = books[i];
		const bookDiv = createBookElement(bookContainer, book, id_reason_dict[book.id]);
		createRemoveButton(bookDiv, book);
	}
};

if (username) {
	document.getElementById("readingListTitle").textContent = `${username}'s Reading List`;
}

async function fetchUsersBooks() {
	const userInfo = await fetch(`/users/${userId}`);
	if (!userInfo.ok) {
		console.error("Failed to fetch user info");
		return;
	}
	const userData = await userInfo.json();

	if (userData.likes.length > 0) {
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
		const id_reason_dict = Object.fromEntries(
			userData.likes.map(({ id, reason }) => [id, reason]),
		);
		const books = await response.json();
		const bookContainer = document.getElementById("my-books-container");
		bookContainer.replaceChildren(); //delete all current children (in case this container is being refreshed)
		createMyBooksElements(books, bookContainer, id_reason_dict);
	} else {
		// No books to display
		const midSection = document.querySelector(".mid-section");
		midSection.innerHTML = "<h3>No books</h3>";
		const librarianDialogue = document.querySelector(".dialogue-div");
		librarianDialogue.innerHTML = `<p>Oh no! You haven't liked any books yet, when you do I'll be sure to keep track.</p>`;
	}
}

async function fetchUserRecommendation(count) {
	const response = await fetch(`/recommendations/byUserPreferences/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ count }),
	});

	if (response.ok) {
		const data = await response.json();
		const bookRecommendationContainer = document.getElementById("my-recommendations-container");
		const recomendationsText = document.querySelector("#recomendations-text");
		recomendationsText.innerHTML = `<p>Based on your reading list you might like these!</p>`;
		createBookElements(data, count, bookRecommendationContainer, onBookLiked, onBookDisliked);
	}
}

function onBookLiked(bookDiv, book) {
	// Add book to the likes list
	setTimeout(() => {
		const bookContainer = document.getElementById("my-books-container");

		const dict = {};
		dict[book.id] = book.reason_for_recommendation;
		createMyBooksElements([book], bookContainer, dict); // TODO use id_reason_dict instead
	}, 500);

	// Find a new recommendation to replace it
	fetchUserRecommendation(1);
}

function onBookDisliked(bookDiv, book) {
	// Find a new recommendation to replace it
	fetchUserRecommendation(1);
}

async function init() {
	await fetchUsersBooks();
	await fetchUserRecommendation(4);
}

init();

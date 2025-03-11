const username = localStorage.getItem("username");
const userId = localStorage.getItem("userID");

const createMyBooksElements = (books, bookContainer) => {
	const librarianDialogue = document.querySelector(".dialogue-div");

	for (let i = 0; i < books.length; i++) {
		const book = books[i];
		const bookDiv = document.createElement("div");
		bookDiv.classList.add("book");

		//add image
		const img = document.createElement("img");
		img.src = book.cover;
		img.alt = book.title;
		bookDiv.appendChild(img);

		// Add mouseover event for book info
		bookDiv.addEventListener("mouseover", () => {
			if (librarianDialogue) {
				librarianDialogue.innerHTML = `<p>${book.title}, by ${book.author} was released in ${book.year}.</p>`;
			}
		});

		// Create remove button
		const buttonsDiv = document.createElement("div");
		buttonsDiv.classList.add("book-buttons");

		const removeBtn = document.createElement("button");
		removeBtn.classList.add("reject");
		removeBtn.innerHTML = "✕";
		removeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			judgementPassed("likes", book, false);
			bookDiv.remove();
			if (librarianDialogue) {
				librarianDialogue.innerHTML = `<p>I've removed "${book.title}" from your reading list.</p>`;
			}
		});
		removeBtn.addEventListener("mouseenter", () => {
			if (librarianDialogue) {
				librarianDialogue.innerHTML = `<p>Would you like to remove "${book.title}" from your reading list?</p>`;
			}
		});

		buttonsDiv.appendChild(removeBtn);
		bookDiv.appendChild(buttonsDiv);
		bookContainer.appendChild(bookDiv);
	}
};

if (username) {
	document.getElementById("readingListTitle").textContent = `${username}'s Reading List`;
	document.getElementById("recommendationsListTitle").textContent =
		`${username}'s Recommendation List`;
}

async function fetchUsersBooks() {

	const userInfo = await fetch(`/users/${userId}`);
	if (!userInfo.ok) {
		console.error("Failed to fetch user info");
		return;
	}
	const userData = await userInfo.json();

	// Fetch book details using the likes array
	const book_ids =  userData.likes.map(bookData => bookData.id);
	const response = await fetch("/books/fetchBooksByIDs", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ids: book_ids }),
	});

	if (!response.ok) {
		console.error("Failed to fetch book details");
		return;
	}

	const books = await response.json();
	const bookContainer = document.getElementById("my-books-container");
	createMyBooksElements(books, bookContainer);
}

async function fetchUserRecommendation() {
	console.log(`userID is ${userId}`);
	const response = await fetch(`/recommendations/byUserPreferences/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();
	const bookRecommendationContainer = document.getElementById("my-recommendations-container");
	const bookInfoContainer1 = document.querySelector(".book-info-container");
	const length = 4;
	createBookElements(data, length, bookRecommendationContainer, bookInfoContainer1);
}

fetchUsersBooks();
fetchUserRecommendation();

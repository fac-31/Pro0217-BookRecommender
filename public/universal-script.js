const doorCreak = new Audio("/door-creaking.mp3");

document.addEventListener("DOMContentLoaded", () => {
	const darkness = document.getElementById("darkness");
	if (!darkness) return; // page don't have darkness

	darkness.style.opacity = 0;
	setTimeout(() => {
		darkness.classList.add("hidden");
	}, 2000);
});

const pageTransitionFunc = (destination) => {
	doorCreak.addEventListener("ended", () => {
		window.location.href = destination;
	});
	setTimeout(() => {
		doorCreak.play();
	}, 2000);
};

const interactionAnimation = (likeOrDislike, bookDiv) => {
	switch (likeOrDislike) {
		case "like":
		case "dislike":
			bookDiv.classList.add("jump-highlight-" + likeOrDislike);
			updateBookDislay(bookDiv, true);

			setTimeout(() => {
				bookDiv.classList.remove("jump-highlight-" + likeOrDislike);
				updateBookDislay(bookDiv, false);
			}, 500);

			setTimeout(() => {
				bookDiv.remove();
			}, 1500);
			break;
		default:
			throw new Error("bad argument passed to interactionAnimation");
	}
};

const createBookElement = (container, book, reason) => {
	const bookDiv = document.createElement("div");
	bookDiv.classList.add("book");
	bookDiv.setAttribute("bookid", book.id); // For selecting books in tests
	updateBookDislay(bookDiv, false);

	//add image
	const img = document.createElement("img");
	img.src = book.cover;
	img.alt = book.title;
	bookDiv.appendChild(img);
	// Add mouseover event for book info
	bookDiv.addEventListener("mouseover", () => {
		const librarianDialogue = document.querySelector(".dialogue-div");
		if (librarianDialogue) {
			librarianDialogue.innerHTML = `
				<p>${book.title}, by ${book.author} was released in ${book.year}</p>
				<p>Reason: ${reason || "No reason provided."}</p>
			`;
		}
	});

	container.appendChild(bookDiv);
	updateBookDislay(bookDiv, true, 100);
	return bookDiv;
};

const updateBookDislay = (bookDiv, show, timeout = 0) => {
	setTimeout(() => {
		bookDiv.style.opacity = show ? "1" : "0";
		bookDiv.style.width = show ? "128px" : "0";
		bookDiv.style.margin = show ? "0" : "-10px";
		bookDiv.style.borderWidth = show ? "unset" : "0";
	}, timeout);
};

const judgementPassed = async (key, book, add = true) => {
	const dataToSend = {
		user_id: localStorage.getItem("userID"),
		book: book,
		key: key,
		add: add,
	};

	try {
		const response = await fetch("/users/update-book", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataToSend),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
	} catch (error) {
		console.error("Error:", error.message);
		throw error; // Rethrow to let the caller handle it
	}
};

const createButtonElements = (bookDiv, book, onBookLiked, onBookDisliked) => {
	const librarianDialogue = document.querySelector(".dialogue-div");

	// Create buttons container
	const buttonsDiv = document.createElement("div");
	buttonsDiv.classList.add("book-buttons");

	// Create accept button
	const acceptBtn = document.createElement("button");
	acceptBtn.classList.add("accept");
	acceptBtn.innerHTML = "✓";
	acceptBtn.addEventListener("click", async (e) => {
		e.stopPropagation();
		interactionAnimation("like", bookDiv);
		librarianDialogue.innerHTML = `<p>Good choice! I'll add "${book.title}" to your reading list!<p>`;
		await judgementPassed("likes", book);

		if (onBookLiked != undefined) onBookLiked(bookDiv, book);
	});
	acceptBtn.addEventListener("mouseenter", () => {
		librarianDialogue.innerHTML = `<p>Interested, I can add it to your reading list?</p>`;
	});

	// Create reject button
	const rejectBtn = document.createElement("button");
	rejectBtn.classList.add("reject");
	rejectBtn.innerHTML = "✕";
	rejectBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		interactionAnimation("dislike", bookDiv);
		judgementPassed("dislikes", book);
		librarianDialogue.innerHTML = `<p>Got it! I won't recommend books like "${book.title}" going forward! <p>`;

		if (onBookDisliked != undefined) onBookDisliked(bookDiv, book);
	});
	rejectBtn.addEventListener("mouseenter", () => {
		librarianDialogue.innerHTML = `<p>Not a fan of ${book.title}? I can remember to not recommend similar books in the future?</p>`;
	});

	buttonsDiv.appendChild(acceptBtn);
	buttonsDiv.appendChild(rejectBtn);
	bookDiv.appendChild(buttonsDiv);
};

const createRemoveButton = (bookDiv, book) => {
	const librarianDialogue = document.querySelector(".dialogue-div");

	// Create remove button
	const buttonsDiv = document.createElement("div");
	buttonsDiv.classList.add("book-buttons");

	const removeBtn = document.createElement("button");
	removeBtn.classList.add("reject");
	removeBtn.innerHTML = "✕";
	removeBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		judgementPassed("likes", book, false);
		interactionAnimation("dislike", bookDiv);

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
};

const createBookElements = (
	data,
	length,
	bookRecommendationContainer,
	onBookLiked,
	onBookDisliked,
) => {
	// Convert array to data object if needed
	data = Array.isArray(data) ? { books: data } : data;

	for (let i = 0; i < length; i++) {
		const book = data.books[i];
		const bookDiv = createBookElement(
			bookRecommendationContainer,
			book,
			book.reason_for_recommendation,
		);
		createButtonElements(bookDiv, book, onBookLiked, onBookDisliked);
	}
};

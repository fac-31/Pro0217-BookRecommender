const librarianDialogue = document.querySelector(".dialogue-div");
const bookPreferenceForm = document.querySelector(".book-preference-form");
const bookContainer = document.querySelector(".book-container");
const book1 = document.getElementById("book-1");
const book2 = document.getElementById("book-2");
const book3 = document.getElementById("book-3");
const book4 = document.getElementById("book-4");
const bookInfoContainer = document.querySelector(".book-info-container");

let userPrompt = localStorage.getItem("userPrompt");

bookPreferenceForm.onsubmit = (e) => {
  e.preventDefault();
  userPrompt = document.getElementById("book-preference-input").value;
  localStorage.setItem("userPrompt", userPrompt);
  console.log(userPrompt);
  setTimeout(() => {
    librarianDialogue.classList.add("hidden");
    behindDesk = false;
    walkAway();
  }, 1000);
  librarianDialogue.innerHTML = "<p>I'll be right back!</p>";
  bookPreferenceForm.classList.add("hidden");
};

let foundBooks;
let bookData;

const createButtonElements = (bookDiv, index) => {
  
  const acceptButton = document.createElement('button');
  acceptButton.classList.add("book-btn", "accept", "hidden");
  acceptButton.innerHTML = "&#10004;"; // Renders ✓

  acceptButton.onclick = () => {
    judgementPassed(index+1, 'likes');

  }

  const acceptButtonLabel = document.createElement('div');
  acceptButtonLabel.classList.add("accept-btn-label", "hidden");
  acceptButtonLabel.innerHTML= "Add book to readlist";

  acceptButton.onmouseenter = () => {
    acceptButtonLabel.classList.toggle("hidden");
  }
  acceptButton.onmouseleave = () => {
    acceptButtonLabel.classList.toggle("hidden");
  }
 
  const rejectButton = document.createElement('button');
  rejectButton.classList.add("book-btn", "reject", "hidden");
  rejectButton.innerHTML = "&#10006;"; // Renders x

  rejectButton.onclick = () => {
    judgementPassed(index+1, 'dislikes');
  }

  const rejectButtonLabel = document.createElement('div');
  rejectButtonLabel.classList.add("reject-btn-label", "hidden");
  rejectButtonLabel.innerHTML= "Not interested";

  rejectButton.onmouseenter = () => {
    rejectButtonLabel.classList.toggle("hidden");
  }
  rejectButton.onmouseleave = () => {
    rejectButtonLabel.classList.toggle("hidden");
  }
 
  bookDiv.appendChild(acceptButton);
  bookDiv.appendChild(acceptButtonLabel);
  bookDiv.appendChild(rejectButton);
  bookDiv.appendChild(rejectButtonLabel);

    // Reveal "want to read" and "not interested" buttons
    bookDiv.onmouseenter = () => {
        acceptButton.classList.toggle("hidden");
        rejectButton.classList.toggle("hidden");
    };
    // Hide "want to read" and "not interested" buttons
    bookDiv.onmouseleave = () => {
      acceptButton.classList.toggle("hidden");
      rejectButton.classList.toggle("hidden");
  };

}
const createBookElements = (data, length, bookRecommendationContainer) => {

  for (let i = 0; i < length; i++) {

    const book = data.books[i];
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    //add image
    const img = document.createElement('img');
    img.src = book.cover;
    img.alt = book.title;
    bookDiv.appendChild(img);

    bookDiv.onclick = () => {
      bookInfoContainer.classList.remove("hidden");
      document.getElementById(
        "title"
      ).innerText = `Title: ${book.title}`;
      document.getElementById(
        "author"
      ).innerText = `Author: ${book.author}`;
      document.getElementById(
        "year"
      ).innerText = `Year: ${book.year}`;
      document.getElementById(
        "reason"
      ).innerText = `Reason: ${book.reason_for_recommendation}`;
    };

    createButtonElements(bookDiv, i);
    bookRecommendationContainer.appendChild(bookDiv);
  }

} 

const checkLibrary = async () => {
  try {
    const response = await fetch("/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt }),
    });

    const data = await response.json();
    localStorage.setItem("bookData", JSON.stringify(data));
    bookData = JSON.parse(localStorage.getItem("bookData"));
    console.log(data);

    const length = 4;
    const bookRecommendationContainer = document.getElementById('user-prompt-recommendations-container');
    createBookElements(data, length, bookRecommendationContainer);

    foundBooks = true;
    comeBack();
  } catch (error) {
    console.error("Error:", error);
    foundBooks = false;
    comeBack();
  }
};

const goBack = () => {
  document.getElementById("darkness").classList.opacity = 0;
  document.getElementById("darkness").classList.remove("hidden");
  document.getElementById("darkness").style.opacity = 1;
  setTimeout(() => {
    pageTransitionFunc("/index.html");
  }, 2000);
};

const judgementPassed = (bookNum, key) => {
  const dataToSend = {
    user_id: localStorage.getItem("userID"),
    book: bookData.books[bookNum - 1],
    key: key,
    add: true,
  };

  fetch("/users/update-book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

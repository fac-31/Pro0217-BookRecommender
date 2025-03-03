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

    for (let i = 0; i < 4; i++) {
      document.getElementById(`book-${i + 1}-image`).src = data.books[i].cover;
      document.getElementById(`book-${i + 1}-image`).alt = data.books[i].title;
      document.getElementById(`book-${i + 1}`).onclick = () => {
        bookInfoContainer.classList.remove("hidden");
        document.getElementById(
          "title"
        ).innerText = `Title: ${data.books[i].title}`;
        document.getElementById(
          "author"
        ).innerText = `Author: ${data.books[i].author}`;
        document.getElementById(
          "year"
        ).innerText = `Year: ${data.books[i].year}`;
        document.getElementById(
          "reason"
        ).innerText = `Reason: ${data.books[i].reason_for_recommendation}`;
      };

      // Reveal "want to read" and "not interested" buttons
      document.getElementById(`book-${i + 1}`).onmouseenter = () => {
        document
          .getElementById(`book-${i + 1}-accept-btn`)
          .classList.toggle("hidden");
        document
          .getElementById(`book-${i + 1}-reject-btn`)
          .classList.toggle("hidden");
      };

      // Hide "want to read" and "not interested" buttons
      document.getElementById(`book-${i + 1}`).onmouseleave = () => {
        document
          .getElementById(`book-${i + 1}-accept-btn`)
          .classList.toggle("hidden");
        document
          .getElementById(`book-${i + 1}-reject-btn`)
          .classList.toggle("hidden");
      };

      // Show (and hide) button labels on hover
      document.getElementById(`book-${i + 1}-accept-btn`).onmouseenter = () => {
        document
          .getElementById(`book-${i + 1}-accept-btn-label`)
          .classList.toggle("hidden");
      };

      document.getElementById(`book-${i + 1}-accept-btn`).onmouseleave = () => {
        document
          .getElementById(`book-${i + 1}-accept-btn-label`)
          .classList.toggle("hidden");
      };

      document.getElementById(`book-${i + 1}-reject-btn`).onmouseenter = () => {
        document
          .getElementById(`book-${i + 1}-reject-btn-label`)
          .classList.toggle("hidden");
      };

      document.getElementById(`book-${i + 1}-reject-btn`).onmouseleave = () => {
        document
          .getElementById(`book-${i + 1}-reject-btn-label`)
          .classList.toggle("hidden");
      };

      // Reveal "want to read" and "not interested" buttons
      document.getElementById(`book-${i + 1}`).onmouseenter = () => {
        document
          .getElementById(`book-${i + 1}-accept-btn`)
          .classList.toggle("hidden");
        document
          .getElementById(`book-${i + 1}-reject-btn`)
          .classList.toggle("hidden");
      };

      // Hide "want to read" and "not interested" buttons
      document.getElementById(`book-${i + 1}`).onmouseleave = () => {
        document
          .getElementById(`book-${i + 1}-accept-btn`)
          .classList.toggle("hidden");
        document
          .getElementById(`book-${i + 1}-reject-btn`)
          .classList.toggle("hidden");
      };

      // Show (and hide) button labels on hover
      document.getElementById(`book-${i + 1}-accept-btn`).onmouseenter = () => {
        document
          .getElementById(`book-${i + 1}-accept-btn-label`)
          .classList.toggle("hidden");
      };

      document.getElementById(`book-${i + 1}-accept-btn`).onmouseleave = () => {
        document
          .getElementById(`book-${i + 1}-accept-btn-label`)
          .classList.toggle("hidden");
      };

      document.getElementById(`book-${i + 1}-reject-btn`).onmouseenter = () => {
        document
          .getElementById(`book-${i + 1}-reject-btn-label`)
          .classList.toggle("hidden");
      };

      document.getElementById(`book-${i + 1}-reject-btn`).onmouseleave = () => {
        document
          .getElementById(`book-${i + 1}-reject-btn-label`)
          .classList.toggle("hidden");
      };
    }

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

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

    const length = 4;
    const bookRecommendationContainer = document.getElementById('user-prompt-recommendations-container');
    createBookElements(data, length, bookRecommendationContainer, bookInfoContainer);

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

const canvas = document.getElementById("librarian-canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const librarianImage = new Image();
librarianImage.src = "/librarian-spritesheet.png";
const deskImage = new Image();
deskImage.src = "/table-new.png";
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
let staggerFrames = 20;
const framesPerSecond = 30;

let outOfFrame = false;
let behindDesk = true;
let progress = canvasWidth / 2 - 27;

const librarianIdle = () => {
  if (!behindDesk) {
    return;
  }

  staggerFrames = 20;
  frameY = 0;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(
    librarianImage,
    53 * frameX,
    53 * frameY,
    53,
    53,
    canvasWidth / 2 - 27,
    0,
    53,
    53
  );

  ctx.drawImage(
    deskImage,
    0,
    0,
    100,
    100,
    canvasWidth / 2 - 50,
    canvasHeight / 2 - 26,
    100,
    100
  );

  if (gameFrame % staggerFrames === 0) {
    if (frameX < 1) {
      frameX++;
    } else {
      frameX = 0;
    }
  }

  gameFrame++;

  requestAnimationFrame(librarianIdle);
};

const walkAway = () => {
  if (outOfFrame) {
    checkLibrary();
    return;
  }

  staggerFrames = 5;
  frameY = 1;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(
    librarianImage,
    53 * frameX,
    53 * frameY,
    53,
    53,
    progress,
    0,
    53,
    53
  );

  ctx.drawImage(
    deskImage,
    0,
    0,
    100,
    100,
    canvasWidth / 2 - 50,
    canvasHeight / 2 - 26,
    100,
    100
  );

  if (gameFrame % staggerFrames === 0) {
    if (frameX < 1) {
      frameX++;
    } else {
      frameX = 0;
    }
  }

  gameFrame++;

  if (progress < canvasWidth - 10) {
    progress++;
  } else {
    outOfFrame = true;
  }

  setTimeout(() => {
    requestAnimationFrame(walkAway);
  }, 1000 / framesPerSecond);
};

const comeBack = () => {
  if (behindDesk) {
    librarianIdle();
    librarianDialogue.innerHTML = "<p>Here we are, take a look at these!</p>";
    librarianDialogue.classList.remove("hidden");
    bookContainer.classList.remove("hidden");
    return;
  }

  staggerFrames = 5;
  frameY = 2;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(
    librarianImage,
    53 * frameX,
    53 * frameY,
    53,
    53,
    progress,
    0,
    53,
    53
  );

  ctx.drawImage(
    deskImage,
    0,
    0,
    100,
    100,
    canvasWidth / 2 - 50,
    canvasHeight / 2 - 26,
    100,
    100
  );

  if (gameFrame % staggerFrames === 0) {
    if (frameX < 1) {
      frameX++;
    } else {
      frameX = 0;
    }
  }

  gameFrame++;

  if (progress > canvasWidth / 2 - 27) {
    progress--;
  } else {
    behindDesk = true;
  }

  setTimeout(() => {
    requestAnimationFrame(comeBack);
  }, 1000 / framesPerSecond);
};

librarianIdle();

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
  e.preventDefault(); // Prevent default form submission
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

const checkLibrary = async () => {
  try {
    const response = await fetch("/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt }), //{ userInput } is syntactic sugar for { "userInput" : userInput  }
    });

    const data = await response.json();

    console.log(data);
    console.log(data[0]);
    for (let i = 0; i < 4; i++) {
      document.getElementById(`book-${i + 1}-image`).src = data[i].cover;
      document.getElementById(`book-${i + 1}-image`).alt =
        data[i].recommendation.title;
      document.getElementById(`book-${i + 1}`).onclick = () => {
        bookInfoContainer.classList.remove("hidden");
        document.getElementById(
          "title"
        ).innerText = `Title: ${data[i].recommendation.title}`;
        document.getElementById(
          "author"
        ).innerText = `Author: ${data[i].recommendation.author}`;
        document.getElementById(
          "year"
        ).innerText = `Year: ${data[i].recommendation.year}`;
        document.getElementById(
          "reason"
        ).innerText = `Reason: ${data[i].recommendation.reason_for_recommendation}`;
      };
    }
    comeBack();
  } catch (error) {
    console.error("Error:", error);
  }
};

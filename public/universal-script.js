const doorCreak = new Audio("/door-creaking.mp3");

document.addEventListener("DOMContentLoaded", () => {
  const darkness = document.getElementById("darkness");
  if (!darkness)
    return; // page don't have darkness

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



const judgementPassed = (key, book) => {
  const dataToSend = {
    user_id: localStorage.getItem("userID"),
    book: book,
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


const createButtonElements = (bookDiv, index, book) => {
  
  const acceptButton = document.createElement('button');
  acceptButton.classList.add("book-btn", "accept", "hidden");
  acceptButton.innerHTML = "&#10004;"; // Renders ✓
  acceptButton.onclick = () => {
    judgementPassed('likes', book);

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
    judgementPassed('dislikes', book);
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
      console.log("toggle accept and reject buttons");
        acceptButton.classList.toggle("hidden");
        rejectButton.classList.toggle("hidden");
    };
    // Hide "want to read" and "not interested" buttons
    bookDiv.onmouseleave = () => {
      acceptButton.classList.toggle("hidden");
      rejectButton.classList.toggle("hidden");
  };

}
const createBookElements = (data, length, bookRecommendationContainer, bookInfoContainer) => {

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

    createButtonElements(bookDiv, i, book);
    bookRecommendationContainer.appendChild(bookDiv);
  }

} 

const doorCreak = new Audio('/door-creaking.mp3');

document.addEventListener('DOMContentLoaded', () => {
  const darkness = document.getElementById('darkness');
  if (!darkness) return; // page don't have darkness

  darkness.style.opacity = 0;
  setTimeout(() => {
    darkness.classList.add('hidden');
  }, 2000);
});

const pageTransitionFunc = (destination) => {
  doorCreak.addEventListener('ended', () => {
    window.location.href = destination;
  });
  setTimeout(() => {
    doorCreak.play();
  }, 2000);
};

const judgementPassed = (key, book) => {
  console.log(book);
  const dataToSend = {
    user_id: localStorage.getItem('userID'),
    book: book,
    key: key,
    add: true,
  };

  fetch('/users/update-book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
};

const createButtonElements = (bookDiv, index, book) => {
  const librarianDialogue = document.querySelector('.dialogue-div');

  // Create buttons container
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('book-buttons');

  // Create accept button
  const acceptBtn = document.createElement('button');
  acceptBtn.classList.add('accept');
  acceptBtn.innerHTML = '✓';
  acceptBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    judgementPassed('likes', book);
    librarianDialogue.innerHTML = `<p>Good choice! I've added "${book.title}" to your reading list!<p>`;
  });
  acceptBtn.addEventListener('mouseenter', () => {
    librarianDialogue.innerHTML = `<p>Interested, I can add it to your reading list?</p>`;
  });

  // Create reject button
  const rejectBtn = document.createElement('button');
  rejectBtn.classList.add('reject');
  rejectBtn.innerHTML = '✕';
  rejectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    judgementPassed('dislikes', book);
    librarianDialogue.innerHTML = `<p>Got it! I won't recommend books like "${book.title}" going forward! <p>`;
  });
  rejectBtn.addEventListener('mouseenter', () => {
    librarianDialogue.innerHTML = `<p>Not a fan of ${book.title}? I can remember to not recommend similar books in the future?</p>`;
  });

  buttonsDiv.appendChild(acceptBtn);
  buttonsDiv.appendChild(rejectBtn);
  bookDiv.appendChild(buttonsDiv);
};
const createBookElements = (data, length, bookRecommendationContainer) => {
  const librarianDialogue = document.querySelector('.dialogue-div');

  // Convert array to data object if needed
  data = Array.isArray(data) ? { books: data } : data;

  for (let i = 0; i < length; i++) {
    const book = data.books[i];
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    //add image
    const img = document.createElement('img');
    img.src = book.cover;
    img.alt = book.title;
    bookDiv.appendChild(img);
    // Add mouseover event for book info
    bookDiv.addEventListener('mouseover', () => {
      librarianDialogue.innerHTML = `<p>${book.title}, by ${book.author} was released in ${book.year}. ${book.reason_for_recommendation}</p>`;
    });

    createButtonElements(bookDiv, i, book);
    bookRecommendationContainer.appendChild(bookDiv);
  }
};

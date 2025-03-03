const username = localStorage.getItem('username');
const userId = localStorage.getItem('userID');
if (username) {
  document.getElementById(
    'readingListTitle'
  ).textContent = `${username}'s Reading List`;
  document.getElementById(
    'recommendationsListTitle'
  ).textContent = `${username}'s Recommendation List`;
}

async function fetchUsersBooks()
{
  const userInfo = await fetch(`/users/${userId}`);
  if (!userInfo.ok) {
    console.error('Failed to fetch user info');
    return;
  }
  const userData = await userInfo.json();
  const bookIds = userData.likes;

  // Fetch book details using the likes array
  const response = await fetch('/books/fetchBooksByIDs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: bookIds }),
  });

  if (!response.ok) {
    console.error('Failed to fetch book details');
    return;
  }

  const books = await response.json();

  const bookContainer = document.getElementById('my-books-container');
  const bookInfoContainer = document.querySelector('.book-info-container');

  books.forEach((book) => {
    const bookDiv = document.createElement('div');


    bookDiv.addEventListener('mouseenter', () => {
      bookInfoContainer.classList.remove("hidden");
      document.getElementById('title').innerText = `Title: ${book.volumeInfo.title}`;
      document.getElementById('author').innerText = `Author: ${book.volumeInfo.authors.join(', ')}`;
      document.getElementById('year').innerText = `Year: ${book.volumeInfo.publishedDate}`;
    });

    bookDiv.addEventListener('mouseleave', () => {
      bookInfoContainer.classList.add("hidden");
    
    });

    /*
    bookDiv.addEventListener('click', () => {
      bookInfoContainer.classList.add('active');
      // This info is wrong at the moment 
      document.getElementById('title').innerText = `Title: ${book.title}`;
      document.getElementById('author').innerText = `Author: ${book.author}`;
      document.getElementById('year').innerText = `Year: ${book.year}`;
    });
    */

    bookDiv.classList.add('book');
    bookDiv.id = book.id;
    const img = document.createElement('img');
    img.src = book.cover;
    img.alt = book.title;

    bookDiv.appendChild(img);
    bookContainer.appendChild(bookDiv);
  });

  // Close the book-info-container when clicking outside of it
  document.addEventListener('click', (event) => {
    if (!bookInfoContainer.contains(event.target) && !event.target.closest('.book')) {
      bookInfoContainer.classList.remove('active');
    }
  });
}

async function fetchUserRecommendation()
{

  console.log(`userID is ${userId}`);
  const response = await fetch(`/recommendations/byUserPreferences/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const booksJsonObject = await response.json();
 const books = booksJsonObject.books;
  console.log("retrieved by preference");
  console.log(books);
  const bookRecommendationContainer = document.getElementById('my-recommendations-container');
  const bookInfoContainer = document.querySelector('.book-info-container');

  books.forEach((book) => {
    const bookDiv = document.createElement('div');

    bookDiv.addEventListener('mouseenter', () => {
      bookInfoContainer.classList.remove("hidden");
      document.getElementById('title').innerText = `Title: ${book.title}`;
      document.getElementById('author').innerText = `Author: ${book.author}`;
      document.getElementById('year').innerText = `Year: ${book.year}`;
    });

    bookDiv.addEventListener('mouseleave', () => {
      bookInfoContainer.classList.add("hidden");
    
    });

    bookDiv.classList.add('book');
    bookDiv.id = book.ID;
    const img = document.createElement('img');
    img.src = book.cover;
    img.alt = book.title;

    bookDiv.appendChild(img);
    bookRecommendationContainer.appendChild(bookDiv);
  });

}

fetchUsersBooks();
fetchUserRecommendation();

const canvas = document.getElementById('librarian-canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const librarianImage = new Image();
librarianImage.src = '/images/librarian-spritesheet.png';
const deskImage = new Image();
deskImage.src = '/images/table-new.png';
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
let staggerFrames = 20;
const framesPerSecond = 30;

let behindDesk = true;

const drawLibrarian = (x, y) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(librarianImage, 53 * frameX, 53 * frameY, 53, 53, x, y, 53, 53);
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
};

const animateLibrarian = () => {
  if (gameFrame % staggerFrames === 0) {
    frameX = frameX < 1 ? frameX + 1 : 0;
  }
  gameFrame++;
};

const librarianIdle = () => {
  if (!behindDesk) return;

  frameY = 0;
  drawLibrarian(canvasWidth / 2 - 27, 0);
  animateLibrarian();

  requestAnimationFrame(librarianIdle);
};

librarianIdle();
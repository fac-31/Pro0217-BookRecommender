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

  // Fetch book details using the likes array
  const response = await fetch('/books/fetchBooksByIDs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: userData.likes }),
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
      document.getElementById('title').innerText = `Title: ${book.title}`;
      document.getElementById('author').innerText = `Author: ${book.author}}`;
      document.getElementById('year').innerText = `Year: ${book.year}`;
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
      // document.getElementById('likes').innerText = `Likes: ${book.count}`;
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

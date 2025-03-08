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

async function fetchUsersBooks() {
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
  console.log(books);
  console.log(books.length);
  createBookElements(books, books.length, bookContainer);
}

async function fetchUserRecommendation() {
  console.log(`userID is ${userId}`);
  const response = await fetch(`/recommendations/byUserPreferences/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log('retrieved by preference');
  console.log(data);
  const bookRecommendationContainer = document.getElementById(
    'my-recommendations-container'
  );
  const bookInfoContainer1 = document.querySelector('.book-info-container');
  const length = 4;
  createBookElements(
    data,
    length,
    bookRecommendationContainer,
    bookInfoContainer1
  );
}

fetchUsersBooks();
fetchUserRecommendation();


export async function fetchBooks(titles) {
  const requests = titles.map(title => 
  {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`)
      .then(response => response.json())
  }
  );

  try {
    const books = await Promise.all(requests);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

export function getCovers(books)
{
  if (books && books.length > 0) {
    const coverURLs = books.map(book =>
      book.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || "No image available"
    );
    return coverURLs;
  }
  else {
    console.log("No books found.");
  }
}
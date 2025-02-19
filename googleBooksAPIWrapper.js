
export async function fetchBooks(titles) {
  const requests = titles.map(title => 
    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`)
      .then(response => response.json())
  );

  try {
    return await Promise.all(requests);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

export function getCovers(books)
{
  if (books) {
    const coverURLs = books.map(book =>
      book.items[0].volumeInfo.imageLinks?.thumbnail || "No image available"
    );
    return coverURLs;
  }
  else {
    console.log("No books found.");
  }
}
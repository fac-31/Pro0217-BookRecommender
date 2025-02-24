
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

export function completeBookWithCoverAndID(booksInfoFromGoogleBooks, recommendations)
{
  let coverURLSandGoogleBooksID = [];
  if (booksInfoFromGoogleBooks && booksInfoFromGoogleBooks.length > 0) {
    coverURLSandGoogleBooksID = booksInfoFromGoogleBooks.map(book =>
      ({ 
         cover: book.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || "No image available",
         ID: book.items?.[0]?.id
      })
    );
    
  }
  else {
    console.log("No books found.");
  }

  console.log(coverURLSandGoogleBooksID);
  for(let i =0;i<recommendations.books.length; i++)
  {
    recommendations.books[i].cover = coverURLSandGoogleBooksID[i].cover;
    recommendations.books[i].ID = coverURLSandGoogleBooksID[i].ID;
  }
}
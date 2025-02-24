
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

export function completeBookWithCoverAndISBN(booksInfoFromGoogleBooks, recommendations)
{
  let coverURLSandISBN = [];
  if (booksInfoFromGoogleBooks && booksInfoFromGoogleBooks.length > 0) {
    coverURLSandISBN = booksInfoFromGoogleBooks.map(book =>
      ({ 
         cover: book.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || "No image available",
         //ISBN: book.items?.[0]?.volumeInfo?.industryIdentifiers.find(id => id.type === "ISBN_13").identifier || "No ISBN available"
      })
    );
    
  }
  else {
    console.log("No books found.");
  }

  for(let i =0;i<recommendations.books.length; i++)
  {
    recommendations.books[i].cover = coverURLSandISBN[i].cover;
    recommendations.books[i].ISBN = "book";//coverURLSandISBN[i].ISBN
  }
}
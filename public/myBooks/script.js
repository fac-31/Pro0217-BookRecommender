const dummyBooks = [
  {
    id: 1,
    image:
      'http://books.google.com/books/content?id=tyfmEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Book One',
  },
  {
    id: 2,
    image:
      'http://books.google.com/books/content?id=tyfmEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Book Two',
  },
  {
    id: 3,
    image:
      'http://books.google.com/books/content?id=tyfmEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Book Three',
  },
  {
    id: 4,
    image:
      'http://books.google.com/books/content?id=tyfmEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Book Four',
  },
  {
    id: 5,
    image:
      'http://books.google.com/books/content?id=tyfmEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Book Five',
  },
  {
    id: 6,
    image:
      'http://books.google.com/books/content?id=tyfmEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Book Six',
  },
];

const user = localStorage.getItem('username');
if (user) {
  console.log('THE USER: ', user);
  document.getElementById(
    'readingListTitle'
  ).textContent = `${user}'s Reading List`;
}

const bookContainer = document.getElementById('my-books-container');

dummyBooks.forEach((book) => {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  bookDiv.id = book.id;
  const img = document.createElement('img');
  img.src = book.image;
  img.alt = book.title;

  bookDiv.appendChild(img);
  bookContainer.appendChild(bookDiv);
});

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

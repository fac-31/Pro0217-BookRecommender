const canvas = document.getElementById("librarian-canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const librarianImage = new Image();
librarianImage.src = "/images/librarian-spritesheet.png";
const deskImage = new Image();
deskImage.src = "/images/table-empty.png";
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
let staggerFrames = 20;
const framesPerSecond = 30;

let outOfFrame = false;
let behindDesk = true;
let foundBooks = false;
let progress = canvasWidth / 2 - 23;

const drawLibrarian = (x, y) => {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(librarianImage, 53 * frameX, 53 * frameY, 53, 53, x, y, 53, 53);
};

const drawDesk = () => {
	deskImage.src = foundBooks ? "/images/table-with-books.png" : "/images/table-empty.png";
	ctx.drawImage(deskImage, 0, 0, 100, 100, canvasWidth / 2 - 50, canvasHeight / 2 - 26, 100, 100);
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
	staggerFrames = 20;
	drawLibrarian(canvasWidth / 2 - 23, 0);
	drawDesk();
	animateLibrarian();

	requestAnimationFrame(librarianIdle);
};

const walkAway = () => {
	foundBooks = false;
	drawDesk();

	if (outOfFrame) {
		checkLibrary();
		return;
	}

	staggerFrames = 5;
	frameY = 1;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(librarianImage, 53 * frameX, 53 * frameY, 53, 53, progress, 0, 53, 53);

	ctx.drawImage(deskImage, 0, 0, 100, 100, canvasWidth / 2 - 50, canvasHeight / 2 - 26, 100, 100);

	if (gameFrame % staggerFrames === 0) {
		if (frameX < 1) {
			frameX++;
		} else {
			frameX = 0;
		}
	}

	gameFrame++;

	if (progress < canvasWidth - 10) {
		progress++;
	} else {
		outOfFrame = true;
	}

	setTimeout(() => {
		requestAnimationFrame(walkAway);
	}, 1000 / framesPerSecond);
};

const newPromptBtn = document.querySelector(".new-prompt-btn");

const comeBack = () => {
	if (behindDesk) {
		librarianIdle();

		newPromptBtn.classList.remove("hidden");

		if (foundBooks) {
			librarianDialogue.innerHTML = "<p>Here we are, take a look at these!</p>";
			librarianDialogue.classList.remove("hidden");
			bookContainer.classList.remove("hidden");
		} else {
			librarianDialogue.innerHTML =
				"<p>Sorry, I'm afraid we don't have any books that match your requirements. Can I find you something else?</p>";
			librarianDialogue.classList.remove("hidden");
			bookPreferenceForm.classList.remove("hidden");
		}
		return;
	}

	staggerFrames = 5;
	frameY = 2;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(librarianImage, 53 * frameX, 53 * frameY, 53, 53, progress, 0, 53, 53);

	ctx.drawImage(deskImage, 0, 0, 100, 100, canvasWidth / 2 - 50, canvasHeight / 2 - 26, 100, 100);

	if (gameFrame % staggerFrames === 0) {
		if (frameX < 1) {
			frameX++;
		} else {
			frameX = 0;
		}
	}

	gameFrame++;

	if (progress > canvasWidth / 2 - 27) {
		progress--;
	} else {
		behindDesk = true;
	}

	setTimeout(() => {
		requestAnimationFrame(comeBack);
	}, 1000 / framesPerSecond);
};

librarianIdle();

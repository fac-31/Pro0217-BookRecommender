const inboxBtn = document.querySelector(".inbox-btn");
const lightsDownOverlay = document.querySelector(".lights-down-overlay");
const inbox = document.querySelector(".inbox");
const closeBtn = document.querySelector(".close-btn");

const openInbox = () => {
	lightsDownOverlay.classList.remove("hidden");
	inbox.classList.remove("hidden");
};

const closeInbox = () => {
	lightsDownOverlay.classList.add("hidden");
	inbox.classList.add("hidden");
};

inboxBtn.addEventListener("click", openInbox);
closeBtn.addEventListener("click", closeInbox);

const newPromptBtn = document.querySelector(".new-prompt-btn");

const refreshRecommendationsPage = () => {
	bookContainer.replaceChildren();
	bookContainer.classList.add("hidden");
	document.getElementById("book-preference-input").value = "";
	bookPreferenceForm.classList.remove("hidden");
	librarianDialogue.innerHTML = "<p>Tell me what books you like and I'll recommend some!</p>";
};

newPromptBtn.addEventListener("click", refreshRecommendationsPage);

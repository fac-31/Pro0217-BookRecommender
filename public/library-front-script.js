const librarySign = document.querySelector(".library-sign");
const registrationForm = document.querySelector(".registration-form");

let username = localStorage.getItem("username");

registrationForm.onsubmit = (e) => {
  e.preventDefault();
  username = document.getElementById("first-name-input").value;
  localStorage.setItem("username", username);
  librarySign.style.opacity = 0;
  registrationForm.style.opacity = 0;

  setTimeout(() => {
    librarySign.remove();
    registrationForm.remove();
    document.getElementById("library-front").style.opacity = 0;
    pageTransitionFunc("/library-interior.html");
  }, 2000);
};

const addFriendOption = document.querySelector(".add-friend");
const remainingUsersContainer = document.querySelector(".remaining-users");

addFriendOption.onmouseenter = () => {
  remainingUsersContainer.classList.remove("hidden");
};

addFriendOption.onmouseleave = () => {
  if (!remainingUsersContainer.matches(":hover")) {
    document.querySelector(".remaining-users").classList.add("hidden");
  }
};

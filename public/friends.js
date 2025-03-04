// Dropdown list visibility

const addFriendOption = document.querySelector(".add-friend");
const remainingUsersContainer = document.querySelector(".remaining-users");

addFriendOption.onmouseenter = () => {
  remainingUsersContainer.classList.remove("hidden");
};

addFriendOption.onmouseleave = () => {
  if (remainingUsersContainer.matches(":hover")) {
    return;
  } else {
    remainingUsersContainer.classList.add("hidden");
  }
};

remainingUsersContainer.onmouseleave = () => {
  if (addFriendOption.matches(":hover")) {
    return;
  } else {
    remainingUsersContainer.classList.add("hidden");
  }
};

// Dynamically create links to friends' reading lists

const friendsContainer = document.querySelector(".friends");
const newFriendUsername = "Bob";

const newFriendLink = document.createElement("a");
newFriendLink.innerText = `${newFriendUsername}`;
friendsContainer.appendChild(newFriendLink);

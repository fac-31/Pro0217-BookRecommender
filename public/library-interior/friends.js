const currentUser = localStorage.getItem("username");
const currentUserID = localStorage.getItem("userID");

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

const friendsContainer = document.querySelector(".friends");
let allUserIDs = [];
let friendIDs;
let remainingUserIDs;

const getFriendsAndRemainingUsers = async () => {
	// Get all users' IDs
	const response = await fetch(`/users/`);
	const allUsers = await response.json();
	let allUserIDs = [];
	for (let i = 0; i < allUsers.length; i++) {
		allUserIDs.push(allUsers[i].id);
	}

	// Get current user's friends' IDs
	const userInfo = await fetch(`/users/${currentUserID}`);
	if (!userInfo.ok) {
		console.error("Failed to fetch user info");
		return;
	}
	const userData = await userInfo.json();
	friendIDs = userData.friends;

	remainingUserIDs = allUserIDs.filter((user) => !friendIDs.includes(user));
	// Remove own ID from list of remaining users' IDs
	remainingUserIDs.splice(remainingUserIDs.indexOf(parseInt(currentUserID)), 1);

	linksToFriendsLists();
	referencesToRemainingUsers();
};

// Create links to friends' reading lists
const linksToFriendsLists = async () => {
	for (let i = 0; i < friendIDs.length; i++) {
		const friendInfo = await fetch(`/users/${friendIDs[i]}`);
		if (!friendInfo.ok) {
			console.error("Failed to fetch friend info");
			return;
		}
		const friendData = await friendInfo.json();

		// Create link to friend's reading list
		const friendLink = document.createElement("a");
		friendLink.id = `link-for-user-${friendData.id}`;
		friendLink.innerText = `${friendData.username}`;
		friendLink.href = "#"; // I will change this to "../theirbooks" once I've added buttons to remove friends
		friendsContainer.appendChild(friendLink);
		friendLink.addEventListener("click", () => {
			removeFriend(friendData.id);
			// localStorage.setItem("friendUsername", `${friendData.username}`);
			// localStorage.setItem("friendUserID", `${friendData.id}`);
		});
	}
};

// Create options to add remaining users as friends
const referencesToRemainingUsers = async () => {
	for (let i = 0; i < remainingUserIDs.length; i++) {
		const remainingUserInfo = await fetch(`/users/${remainingUserIDs[i]}`);
		if (!remainingUserInfo.ok) {
			console.error("Failed to fetch remaining user info");
			return;
		}
		const remainingUserData = await remainingUserInfo.json();

		// Add 'link' for remaining user
		const remainingUserLink = document.createElement("a");
		remainingUserLink.id = `link-for-user-${remainingUserData.id}`;
		remainingUserLink.innerText = `${remainingUserData.username}`;
		remainingUserLink.href = "#";
		remainingUsersContainer.appendChild(remainingUserLink);
		remainingUserLink.addEventListener("click", () => {
			addNewFriend(remainingUserData.id);
		});
	}
};

// Add new friend
const addNewFriend = async (selectedUserID) => {
	// Add selected user ID to current user's friends list
	const dataToSend = {
		user_id: currentUserID,
		friend_id: selectedUserID,
		key: "friends",
		add: true,
	};

	fetch("/users/update-friend", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataToSend),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error("Error:", error);
		});

	// Remove 'link' from remaining users list
	document.getElementById(`link-for-user-${selectedUserID}`).remove();

	// Get new friend's data from database
	const newFriendInfo = await fetch(`/users/${selectedUserID}`);
	if (!newFriendInfo.ok) {
		console.error("Failed to fetch remaining user info");
		return;
	}
	const newFriendData = await newFriendInfo.json();

	// Create link to new friend's reading list
	const newFriendLink = document.createElement("a");
	newFriendLink.id = `link-for-user-${newFriendData.id}`;
	newFriendLink.innerText = `${newFriendData.username}`;
	newFriendLink.href = "#"; // I will change this to "../theirbooks" once I've added buttons to remove friends
	friendsContainer.appendChild(newFriendLink);
	newFriendLink.addEventListener("click", () => {
		removeFriend(newFriendData.id);
		// localStorage.setItem("friendUsername", `${newFriendData.username}`);
		// localStorage.setItem("friendUserID", `${newFriendData.id}`);
	});
};

// Remove friend
const removeFriend = async (selectedUserID) => {
	// Remove selected user ID from current user's friends array
	const dataToSend = {
		user_id: currentUserID,
		friend_id: selectedUserID,
		key: "friends",
		add: false,
	};

	fetch("/users/update-friend", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataToSend),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error("Error:", error);
		});

	// Remove link from user's friends list
	document.getElementById(`link-for-user-${selectedUserID}`).remove();

	// Get estranged friend's data from database
	const estrangedFriendInfo = await fetch(`/users/${selectedUserID}`);
	if (!estrangedFriendInfo.ok) {
		console.error("Failed to fetch remaining user info");
		return;
	}
	const estrangedFriendData = await estrangedFriendInfo.json();

	// Create 'link' for user in list of remaining users
	const estrangedFriendLink = document.createElement("a");
	estrangedFriendLink.id = `link-for-user-${estrangedFriendData.id}`;
	estrangedFriendLink.innerText = `${estrangedFriendData.username}`;
	estrangedFriendLink.href = "#";
	remainingUsersContainer.appendChild(estrangedFriendLink);
	estrangedFriendLink.addEventListener("click", () => {
		addNewFriend(estrangedFriendData.id);
	});
};

getFriendsAndRemainingUsers();

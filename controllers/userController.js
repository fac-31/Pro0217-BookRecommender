import { userSchema } from '../models/schemas/userSchema.js';
import { bookSchema } from '../models/schemas/bookSchema.js';
import { fetchAPI, getOrCreateFromAPI } from '../models/api.js';

// GET all users (Read)
export async function getUsers(req, res) {
  try {
    res.send(await fetchAPI(req, 'users', 'GET'));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching users', error: error.message });
  }
}

// GET a single user
export async function getUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await fetchAPI(req, `users/${userId}`);
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching user', error: error.message });
  }
}

// CREATE a new user
export async function createUser(req, res) {
  try {
    const user_default = {
      username: req.body.username,
    };

    // Get an existing user, if doesn't exist then create a new one
    let user = await getOrCreateFromAPI(
      req,
      'users',
      userSchema,
      user_default,
      'username'
    );
    res.send(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message });
  }
}

// UPDATE book listings on user
export async function updateBook(req, res) {
  try {
    console.log('user_id, book, key, add, user: ', req.body);
    let user_id = req.body.user_id; // TODO add a password to check that user isnt cheating
    let book = bookSchema.parse(req.body.book); // Info object of a book
    let key = req.body.key; // "likes" or "dislikes"
    let add = req.body.add; // true to add, false to remove

    console.log('key', req.body.key);

    let user = await fetchAPI(req, 'users/' + user_id, 'GET');
    if (Object.keys(user).length == 0)
      return res.status(400).json({ error: 'Invalid user id' });

    user = userSchema.parse(user);
    if (user[key] === undefined)
      return res.status(400).json({ error: 'Invalid key' });

    if (add && !user[key].includes(book.id)) {
      // Add book id into user array
      user[key].push(book.id);

      // Add book infos to the list, if does not exist
      await getOrCreateFromAPI(req, 'books', bookSchema, book, 'id');

      return res.send(await fetchAPI(req, 'users/' + user_id, 'PATCH', user));
    } else if (!add && user[key].includes(book.id)) {
      // Remove book id from the array
      let index = user[key].indexOf(book.id);
      user[key].splice(index, 1);

      // TODO, remove book from the list?

      return res.send(await fetchAPI(req, 'users/' + user_id, 'PATCH', user));
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error updating user book', error: error.message });
  }
}

// UPDATE user's friend list (i.e. add or remove friend)
export async function updateFriend(req, res) {
  try {
    let user_id = req.body.user_id;
    let friend_id = req.body.friend_id;
    let key = req.body.key; // "friends"
    let add = req.body.add; // true to add, false to remove

    let user = await fetchAPI(req, 'users/' + user_id, 'GET');
    if (Object.keys(user).length == 0)
      res.status(400).json({ error: 'Invalid user id' });

    user = userSchema.parse(user);
    if (user[key] === undefined) res.status(400).json({ error: 'Invalid key' });

    if (add && !user[key].includes(friend_id)) {
      // Add new friend id to "friends" array
      user[key].push(friend_id);

      res.send(await fetchAPI(req, 'users/' + user_id, 'PATCH', user));
    } else if (!add && user[key].includes(friend_id)) {
      // Remove friend id from "friends" array
      let index = user[key].indexOf(friend_id);
      user[key].splice(index, 1);

      res.send(await fetchAPI(req, 'users/' + user_id, 'PATCH', user));
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user friend list',
      error: error.message,
    });
  }
}

// UPDATE a user
export async function updateUser(req, res) {
  try {
    res.send(
      await fetchAPI(req, 'users/' + req.params.id, 'PATCH', {
        name: 'Changed',
      })
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating user', error: error.message });
  }
}

// DELETE a user
export async function deleteUser(req, res) {
  try {
    res.send(await fetchAPI(req, 'users/' + req.params.id, 'DELETE'));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting user', error: error.message });
  }
}

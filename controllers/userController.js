import { userSchema, usersSchema } from '../models/schemas/userSchema.js';
import { fetchAPI } from '../models/api.js';

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
    let username = req.body.username;

    // Check if user already exist in db
    let users = usersSchema.parse(await fetchAPI(req, 'users', 'GET'));

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      if (user.username == username) {
        res.send(user);
        return;
      }
    }

    // Otherwise create new user
    let user = userSchema.parse({ username: username });
    res.send(await fetchAPI(req, 'users', 'POST', user));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message });
  }
}

// UPDATE book listings on user
export async function updateBook(req, res) {
  try {
    let user_id = req.body.user_id; // TODO add a password to check that user isnt cheating
    let book_id = req.body.book_id; // id of book
    let key = req.body.key; // "likes" or "dislikes"
    let add = req.body.add; // true to add, false to remove

    let user = await fetchAPI(req, 'users/' + user_id, 'GET');
    if (Object.keys(user).length == 0)
      res.status(400).json({ error: 'Invalid user id' });

    user = userSchema.parse(user);
    if (user[key] === undefined) res.status(400).json({ error: 'Invalid key' });

    if (add && !user[key].includes(book_id)) {
      // Add book id into the arry
      user[key].push(book_id);

      res.send(await fetchAPI(req, 'users/' + user_id, 'PATCH', user));
    } else if (!add && user[key].includes(book_id)) {
      // Remove book id from the array
      let index = user[key].indexOf(book_id);
      user[key].splice(index, 1);

      res.send(await fetchAPI(req, 'users/' + user_id, 'PATCH', user));
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating user book', error: error.message });
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

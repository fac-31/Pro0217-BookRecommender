//import { User } from '../models/User.js';
import { fetchAPI } from '../models/api.js';

// GET all users (Read)
export async function getUsers (req, res) {
  try {

    res.send(await fetchAPI(req, "users", "GET"));

  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// CREATE a new user
export async function createUser(req, res) {
  try {
    
    res.send(await fetchAPI(req, "users", "POST", {name: "Example"}));

  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};


// UPDATE a user
export async function updateUser (req, res) {
  try {

    res.send(await fetchAPI(req, "users/" + req.params.id, "PATCH", {name: "Changed"}));

  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// DELETE a user
export async function deleteUser (req, res)  {
  try {

    res.send(await fetchAPI(req, "users/" + req.params.id, "DELETE"));

  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
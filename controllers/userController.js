//import { User } from '../models/User.js';

// GET all users (Read)
export async function getUsers (req, res) {
  try {
    
    // Model actions

  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// CREATE a new user
export async function createUser(req, res) {
  try {

        // Model actions


  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};


// UPDATE a user
export async function updateUser (req, res) {
  try {

        // Model actions


  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// DELETE a user
export async function deleteUser (req, res)  {
  try {

        // Model actions

  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
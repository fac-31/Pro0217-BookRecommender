// server.js
import express from 'express';
const app = express();
app.use(express.json()); // Middleware to parse JSON bodie
const PORT = process.env.PORT || 3000;

import {recommendRoutes} from './routes/recommendRoutes';
import {userRoutes} from './routes/userRoutes';
import {bookRoutes} from './routes/bookRoutes';

//CRUD operations for books
app.use("/recomendations", recommendRoutes);

//CRUD operations for users
app.use("/users", userRoutes);

//CRUD operations for books
app.use("/books", bookRoutes);

app.use(express.static('public'));  // This auto-adds public/index.html to the "/" page

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

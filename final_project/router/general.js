const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
const users = require("./auth_users.js").users; // Update to use users from auth_users.js
const public_users = express.Router();
const axios = require('axios');

const url  = "https://omoviesmith-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/"

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            console.log(users)
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
        
    }

    
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// // // Get the book list available in the shop
// public_users.get('/', function (req, res) {
//   res.status(200).json(books);
// });

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    // Simulating async operation
    const fetchBooks = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(books);
        }, 1000); // simulate a delay of 1 second
      });
    };
    
    const booksList = await fetchBooks();
    res.status(200).json(booksList);
  } catch (error) {
    res.status(500).send("Error fetching books list");
  }
});

// // Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//   const isbn = req.params.isbn;
//   const book = books[isbn];
//   if (book) {
//     return res.status(200).json(book);
//   } else {
//     return res.status(404).json({ message: "Book not found" });
//   }
// });


// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
  
    // Simulating async operation directly within the endpoint
    const fetchBookByISBN = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const book = books[isbn];
          if (book) {
            resolve(book);
          } else {
            reject("Book not found");
          }
        }, 1000); // simulate a delay of 1 second
      });
    };
  
    try {
      const book = await fetchBookByISBN();
      return res.status(200).json(book);
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  });


// // Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//   const author = req.params.author;
//   const booksByAuthor = Object.values(books).filter(book => book.author === author);
//   if (booksByAuthor.length > 0) {
//     return res.status(200).json(booksByAuthor);
//   } else {
//     return res.status(404).json({ message: "Books by this author not found" });
//   }
// });


// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
  
    // Simulating async operation directly within the endpoint
    const fetchBooksByAuthor = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const booksByAuthor = Object.values(books).filter(book => book.author === author);
          if (booksByAuthor.length > 0) {
            resolve(booksByAuthor);
          } else {
            reject("Books by this author not found");
          }
        }, 1000); // simulate a delay of 1 second
      });
    };
  
    try {
      const booksByAuthor = await fetchBooksByAuthor();
      return res.status(200).json(booksByAuthor);
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  });

// // Get book details based on title
// public_users.get('/title/:title', function (req, res) {
//   const title = req.params.title;
//   const booksByTitle = Object.values(books).filter(book => book.title === title);
//   if (booksByTitle.length > 0) {
//     return res.status(200).json(booksByTitle);
//   } else {
//     return res.status(404).json({ message: "Books with this title not found" });
//   }
// });


// Get book details based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
  
    // Simulating async operation directly within the endpoint
    const fetchBooksByTitle = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const booksByTitle = Object.values(books).filter(book => book.title === title);
          if (booksByTitle.length > 0) {
            resolve(booksByTitle);
          } else {
            reject("Books with this title not found");
          }
        }, 1000); // simulate a delay of 1 second
      });
    };
  
    try {
      const booksByTitle = await fetchBooksByTitle();
      return res.status(200).json(booksByTitle);
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  });


// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;

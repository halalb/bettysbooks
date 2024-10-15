// Import express and ejs
var express = require('express');
var ejs = require('ejs');

// Import mysql module
var mysql = require('mysql2');

// Import bcrypt for password hashing
var bcrypt = require('bcrypt');

var session = require ('express-session')

// Create the express application object
const app = express();
const port = 8000;

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the body parser for parsing form data
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))


// Set up public folder (for css and static js)
app.use(express.static(__dirname + '/public'));

// Define the database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'bettys_books_app',
    password: 'qwertyuiop',
    database: 'bettys_books'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db; // Make the database connection available globally

// Define our application-specific data
app.locals.shopData = { shopName: "Bettys Books" };

// Load the route handlers
const mainRoutes = require("./routes/main");
app.use('/', mainRoutes);

// Load the route handlers for /users
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Load the route handlers for /books
const booksRoutes = require('./routes/books');
app.use('/books', booksRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

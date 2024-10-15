const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const redirectLogin = (req, res, next) => {
  if (!req.session.userId ) {
    res.redirect('./login') // redirect to the login page
  } else { 
      next (); // move to the next middleware function
  } 
}


// Route to render registration form
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// Route to handle user registration
router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password;

    // Hash the password before storing it in the database
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        // Save the user details in the database
        const sql = 'INSERT INTO users (username, firstName, lastName, email, hashedPassword) VALUES (?, ?, ?, ?, ?)';
        const values = [req.body.username, req.body.first, req.body.last, req.body.email, hashedPassword];
p
        db.query(sql, values, function(err, result) {
            if (err) {
                return res.status(500).send('Error saving user to the database');
            }

            // Respond with a success message
            let resultMessage = 'Hello ' + req.body.first + ' ' + req.body.last + ', you are now registered! ';
            resultMessage += 'We will send an email to you at ' + req.body.email + '. ';
            resultMessage += 'Your password is: ' + plainPassword + ' and your hashed password is: ' + hashedPassword;
            res.send(resultMessage);
        });
    });
});

// Route to list users (excluding passwords)
router.get('/list', redirectLogin, function (req, res, next) {
    const sql = 'SELECT username, firstName, lastName, email FROM users';

    db.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send('Error fetching users from the database');
        }

        // Render the list of users using the 'listusers.ejs' view
        res.render('listusers.ejs', { users: result });
    });
});

// Route to display the login form
router.get('/login', function (req, res, next) {
    res.render('login.ejs');
});

// Handle login form submission
  router.post('/loggedin', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
  
    // Retrieve the hashed password for the given username from the database
    const query = 'SELECT * FROM users WHERE username = ?';
    
    db.query(query, [username], function(err, results) {
      if (err) {
        // Handle database error
        res.status(500).send('Database error');
      } else if (results.length === 0) {
        // If no user is found
        res.send('Username not found');
      } else {
        const user = results[0];
        console.log(user.hashedPassword);
  
        // Compare the submitted password with the stored hashed password
        bcrypt.compare(password, user.hashedPassword, function(err, result) {
          if (err) {
            // Handle error
            res.status(500).send('Error during password comparison');
          } else if (result === true) {
            req.session.userId = req.body.username;
            // Passwords match, login successful
            res.send('Login successful' + '<a href='+'/'+'>Home</a>');
          } else {
            // Passwords do not match
            res.send('Incorrect password');
          }
        });
      }
    });
  });
  
// Export the router so that index.js can access it
module.exports = router;

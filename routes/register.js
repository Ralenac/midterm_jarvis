const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // router.get("/register", (req, res) => {

  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       let templateVars = { user: req.session.user };
  //       res.render( "register", templateVars);
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  // return router;

//   /* GET Signup */
//   router.get('/signup', function(req, res) {
//     res.render('register', { title: 'Signup Page'});
// });

//registering new user
router.get('/', (req, res) => {
  const userID = req.session.user_id;
  if (userID) {
    return res.redirect("/api/users/me");
  }
  const templateVars = {
    userexists: false
  }
  res.render('register', templateVars);
});
  return router;
}
// app.get("/register", (req, res) => {
//   let ejsVars = { user: req.session.user };a
//   res.render("register", ejsVars);
// });

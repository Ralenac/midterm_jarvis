/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /* GET Signup */
   router.get('/register', function(req, res) {

    let  userexists = false;

    res.render('register', { title: 'Signup Page', userexists : 'false'});

   });

 /* GET Signup */
 router.post('/register', function(req, res) {
   //get email from incoming request
   //console.log(' printing ------ ',req.body);
  const useremail = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  let userexists = false;
  const body = req.body

  console.log("post register req.body", {body})


  db.query(`SELECT * FROM users where email = $1;`,[useremail])
      .then(data => {


        //if user already exists
        if(data.rows && data.rows.size > 0){
            res.render('login',{ title: 'Sign in', userexists: 'true'})
        }
        else{

          const hashedPassword = bcrypt.hashSync(password, 12);

          // const user = {name: name, email: useremail, password: hashedPassword};
          // user.password = bcrypt.hashSync(user.password, 12);

          console.log({hashedPassword})


          //save user details in DB
          db.query(" INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING * ",[name, useremail, hashedPassword])
           .then(result => {

            console.log("result from insert new user register post", {result})
             const user = result.rows[0];

             res.render("index", {user})
           })
           .catch(err => {
             console.log(err)

             res.render('register', { title: 'Signup Page', registerationstatus: 'error',
             userexists: 'false'})
           })
        }
      })
      .catch(err => {
        console.log( ' processing error message - ', err );
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  //save user details in DB
  //rediret user back to successfull registeration page
  // successfull registeration page will have link to login page.

// Create a new user
// router.post('/', (req, res) => {
//   const user = req.body;
//   user.password = bcrypt.hashSync(user.password, 12);
//   database.addUser(user)
//   .then(user => {
//     if (!user) {
//       res.send({error: "error"});
//       return;
//     }
//     req.session.userId = user.id;
//     res.send("🤗");
//   })
//   .catch(e => res.send(e));
// });

// //Check if a user exists with a given username and password
const login =  function(email, password) {

  let query = `SELECT * FROM users WHERE email = $1;`
  let queryParams = [email]

  console.log(query)
  console.log(queryParams)

  return db.query(query, queryParams)
  .then(result => {
    const user = result.rows[0]
    console.log("getting the user", {user})
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  })
  .catch(err => {
    console.log(err)
  })
}
exports.login = login;

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  console.log("req.body", req.body)
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.user_id = user.id;
      const templateVars =  {user}
      console.log("checking templatevars for index", {templateVars})
      res.render("index", templateVars);
    })
    .catch(e => res.send(e));
});

router.post('/logout', (req, res) => {
  req.session.user_id = null;
  res.send({});
});

router.get("/me", (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    res.send({message: "not logged in"});
    return;
  }

  database.getUserWithId(userId)
    .then(user => {
      if (!user) {
        res.send({error: "no user with that id"});
        return;
      }

      const templateVars =  {user}
      console.log("checking templatevars for index", {templateVars})
      res.render("index", templateVars);
    })
    .catch(e => res.send(e));
});

  return router;
};


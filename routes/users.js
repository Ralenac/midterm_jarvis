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
   router.get('/signup', function(req, res) {

    let  userexists = false;

    console.log(' --- before render --- ',)
    res.render('register', { title: 'Signup Page', userexists : 'false'});

   });

 /* GET Signup */
 router.post('/signup', function(req, res) {
   //get email from incoming request
   console.log(' printing ------ ',req.body);
  const useremail = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  let userexists =false;

  console.log( ' checkpoint ----  1 ');

  db.query(`SELECT * FROM users where email = $1;`,[useremail])
      .then(data => {

        console.log( ' checkpoint ----  2 ');

        //if user already exists
        if(data.rows && data.rows.size >0){
            res.render('register',{ title: 'Signup Page', userexists: 'true'})
        }
        else{

          //user.password = bcrypt.hashSync(user.password, 12);

          const user ={name: name,email: useremail, password: password};
          user.password = bcrypt.hashSync(user.password, 12);

            // database.addUser(user)
            // .then(user => {
            //   if (!user) {
            //     res.send({error: "error"});
            //     return;
            //   }
            //   req.session.userId = user.id;
            //   res.render('register',{ title: 'Signup Page', registerationstatus: 'completed'})
            // })
            // .catch(res.render('register',{ title: 'Signup Page', registerationstatus: 'error'}));



          //save user details in DB
          db.query(" insert into users (name,email,password) values ($1,$2,$3)",[name,useremail,password])
           .then(
             res.render('register',{ title: 'Signup Page', registerationstatus: 'completed', userexists: 'true'})
           )
           .catch(
             res.render('register',{ title: 'Signup Page', registerationstatus: 'error',
             userexists: 'false'})
           )
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
// const login =  function(email, password) {
//   return database.getUserWithEmail(email)
//   .then(user => {
//     if (bcrypt.compareSync(password, user.password)) {
//       return user;
//     }
//     return null;
//   });
// }
// exports.login = login;

// router.post('/login', (req, res) => {
//   const {email, password} = req.body;
//   login(email, password)
//     .then(user => {
//       if (!user) {
//         res.send({error: "error"});
//         return;
//       }
//       req.session.userId = user.id;
//       res.send({user: {name: user.name, email: user.email, id: user.id}});
//     })
//     .catch(e => res.send(e));
// });

// router.post('/logout', (req, res) => {
//   req.session.userId = null;
//   res.send({});
// });

// router.get("/me", (req, res) => {
//   const userId = req.session.userId;
//   if (!userId) {
//     res.send({message: "not logged in"});
//     return;
//   }

//   database.getUserWithId(userId)
//     .then(user => {
//       if (!user) {
//         res.send({error: "no user with that id"});
//         return;
//       }

//       res.send({user: {name: user.name, email: user.email, id: userId}});
//     })
//     .catch(e => res.send(e));
// });

  return router;
};

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const { getUserByEmail } = require('../helpers/database');



// module.exports = (db) => {
//   // load login page
//   router.get('/login', (req, res) => {
//     // check if user is logged in
//     if (req.session.user_id) {
//       res.redirect('/todo');

//     } else {
//       let templateVars = {
//         user: {id: undefined, name: null}
//       };
//       res.render('login', templateVars);
//     }
//   });
// // logging in
// router.post('/login', async (req, res) => {
//   // query the database for the email input by user
//   getUserByEmail(req.body.email)
//     .then(user => {
//       if (!user) {
//         res.json({error: 'User does not exist'});

//       } else {
//         // check password
//         if (!bcrypt.compareSync(req.body.password, user.password)) {
//           res.json({error: 'Password does not match'});

//         } else {
//           req.session = { user_id: user.id };
//           res.redirect('/todo');

//         }
//       }
//     })
//     .catch(err => {
//       console.error('login error', err);
//     });

// });


// return router;
// }


//module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   console.log(req.session);
  //   req.session.user_id = 1;
  //   res.redirect('/');
  // });
  // router.get('/:id', (req, res) => {
  //   req.session.user_id = req.params.id;
  //   res.redirect('/');
  // });

  const { response } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const userID = req.session.user_id;

  if (userID) {
    return res.redirect("/");
  }
  const templateVars = { user: null};
  res.render("login", templateVars);
      })

  router.post('/', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    //req.session.user_id = userID;
    res.redirect("/");

  })
  return router
}

//module.exports = loginRouter;

  //return router;
//};

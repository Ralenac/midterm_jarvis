/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// const db = require('../db/seeds/02_items')

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM items
    WHERE user_id = $1
    `;

    // const userId = req.session.userId;
    const userId = 1;
    const queryParams = [userId]
    console.log(query);
    db.query(query, queryParams)
      .then(result => {
        const items = result.rows;
        console.log({result})
        console.log("what we are getting", {items})
        res.json( items );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.post("/", (req, res) => {
    let query = `INSERT INTO items (user_id, name, created_at, is_active)
          VALUES ($1, $2, $3, $4) RETURNING *`;
    let itemBody = req.body.todo_text;
    itemBody.trim()
    console.log({itemBody})
    // const userId = req.session.userId;
    // const createdAt = Date.now()
    const queryParams = [1, itemBody, '2018-02-12T08:00:00.000Z', true]

    let query2 = `INSERT INTO item_categories (item_id, category_id)
    VALUES ($1, $2) RETURNING *`



    db.query(query, queryParams)
      .then(result => {

        const newItem = result.rows[0];
        console.log("what we are getting", {newItem})
        const newItemId = newItem.id
        const categoryId = 1;
        const query2Params = [newItemId, categoryId]
        console.log(query2Params)
        //we are trying to insert into item_categories
        db.query(query2, query2Params)
        .then(result2 => {
          console.log(result2)
          const newItemCategory = result2.rows[0]
          console.log("newItemCategory", {newItemCategory})
          res.json ({newItem, newItemCategory})
        })
        .catch(err => {
          console.log(err)
          // res
          //   .status(500)
          //   .json({ error: err.message });
        });

        // res.json( newItem );
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });



  })

  return router;
};



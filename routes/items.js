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


  router.post("/othercategory", (req, res) => {

    const queryreq = req.body
    const userId = req.session.user_id;
    const todotext = req.body.todo_text;
    const createdAt = new Date()
    const isActive = true;
    const categoryId = 0;

    console.log({queryreq});
    console.log({userId, todotext, createdAt, isActive, categoryId})

    addItemWithCategory(res, userId, todotext, createdAt, isActive, categoryId)

  })

  router.post("/towatchcategory", (req, res) => {

    const userId = req.session.user_id;
    const todotext = req.body.todo_text;
    const createdAt = new Date()
    const isActive = true;
    const categoryId = 1;

    addItemWithCategory(res, userId, todotext, createdAt, isActive, categoryId)

  })

  router.post("/toreadcategory", (req, res) => {

    const queryreq = req.body
    const userId = req.session.user_id;
    const todotext = req.body.todo_text;
    const createdAt = new Date()
    const isActive = true;
    const categoryId = 2;

    console.log({queryreq});
    console.log({userId, todotext, createdAt, isActive, categoryId})

    addItemWithCategory(res, userId, todotext, createdAt, isActive, categoryId)

  })

  router.post("/toeatcategory", (req, res) => {

    const userId = req.session.user_id;
    const todotext = req.body.todo_text;
    const createdAt = new Date()
    const isActive = true;
    const categoryId = 3;

    addItemWithCategory(res, userId, todotext, createdAt, isActive, categoryId)

  })

  router.post("/tobuycategory", (req, res) => {

    const userId = req.session.user_id;
    const todotext = req.body.todo_text;
    const createdAt = new Date()
    const isActive = true;
    const categoryId = 4;

    addItemWithCategory(res, userId, todotext, createdAt, isActive, categoryId)

  })


  router.get("/", (req, res) => {
    let query = `SELECT * FROM items
    JOIN item_categories ON items.id = item_id
    WHERE item_categories.category_id = $1
    AND items.user_id = $2
    AND items.is_active = true
    Order BY created_at DESC;
    `;
    let categoryId = Number(req.query.category_id);
    let reqquery = req.query
    console.log("this is req query", {reqquery})

    // const userId = req.session.userId;
    const userId = req.session.user_id;

    let queryParams = [categoryId, userId];

    if (categoryId == 0) {
      query = `SELECT * FROM items
      WHERE items.user_id = $1
      AND items.is_active = true
      AND items.id NOT IN (SELECT item_categories.item_id as itemid FROM item_categories)
      ORDER BY created_at DESC;`

      queryParams = [userId];
      console.log("inside category id 0 of get items")

    }

    console.log("category id", categoryId);
    console.log("query", query);
    console.log({queryParams})

    db.query(query, queryParams)
      .then(result => {
        const items = result.rows;
        // console.log({result})
        // console.log("what we are getting", {items})
        res.json( items );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  const addItemWithCategory = function(res, userId, todotext, createdAt, isActive, categoryId) {

    let query = `INSERT INTO items (user_id, name, created_at, is_active)
          VALUES ($1, $2, $3, $4) RETURNING *`;

    const queryParams = [userId, todotext, createdAt, isActive]

    console.log(query)
    console.log("from function", {queryParams})

    let query2 = `INSERT INTO item_categories (item_id, category_id)
    VALUES ($1, $2) RETURNING *`



    db.query(query, queryParams)
      .then(result => {

        const newItem = result.rows[0];
        console.log("what we are getting", {newItem})
        const newItemId = newItem.id
        //need to change and get it from the =req.body.category_id
        // const categoryId = 1;
        const query2Params = [newItemId, categoryId]
        console.log(query2)
        console.log("query2Params", query2Params)
        //we are trying to insert into item_categories

        if(categoryId === 0) {
          res.json (newItem)
          return;
        }

        //we need if statement only when categoryId>0
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

        // res.json( newItem ); if (categoryId = 0)
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });



  }

  return router;
};



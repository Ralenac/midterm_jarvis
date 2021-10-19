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
    let query = `SELECT * FROM categories`;
    console.log(query);
    db.query(query)
      .then(result => {
        const categories = result.rows;
        console.log({result})
        console.log("what we are getting", {categories})
        res.json({ categories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

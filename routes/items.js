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
    let query = `SELECT * FROM items`;
    console.log(query);
    db.query(query)
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
  return router;
};

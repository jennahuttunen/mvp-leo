var express = require("express");
var router = express.Router();
const db = require("../model/helper"); // Is this???

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Hello there!" });
});

// GET all purchases per show_id

// Use a query param to GET either the payment type, id, vender, or date
// One single endpoint that can handle all

// Get all purchases

// PUT a modified show_id, date, vender, payment type, or purchase total
// PUT replaces the entire thing so you only need one update statement
// Definitely need a PUT for the booleans

// POST a new purchase (similar to put) route handler
router.post("/purchases", async function (req, res) {
  // Create a new purchase obj with req.body
  let {
    id,
    production_id,
    date,
    order_num,
    vender,
    items,
    description,
    payment_type,
    total,
    reimb_submitted,
    reimb_received,
  } = req.body;
  // Assume MySQL automatically generates an ID? (Did I tell it to do that?)
  try {
    let sql = `
    INSERT INTO purchases (
      id,
      production_id,
      date,
      order_num,
      vender,
      items,
      description,
      payment_type,
      total,
      reimb_submitted,
      reimb_received)
    VALUES (
      ${id},
      ${production_id},
      ${date},
      ${order_num},
      '${vender}',
      ${items},
      '${description}',
      '${payment_type}',
      ${total},
      ${reimb_submitted},
      ${reimb_received}
    )
    `;
    await db(sql);
    // Return updated array of all purchases
    let result = await db("SELECT * FROM purchases");
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST a new production
router.post("/productions", async function (req, res) {
  try {
    let { id, title, budget } = req.body;
    let sql = `
    INSERT INTO productions (
      id,
      title,
      budget)
    VALUES(
      ${id},
      '${title}',
      ${budget}
    )
    `;
    await db(sql);
    // Return updated array of all productions
    let result = await db("SELECT * FROM productions");
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE an order number

module.exports = router;

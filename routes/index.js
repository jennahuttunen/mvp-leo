var express = require("express");
var router = express.Router();
const db = require("../model/helper"); // Is this???

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Hello there!" });
});

// Get all shows (productions)
router.get("/productions", function (req, res) {
  db("SELECT * FROM productions;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// Get all purchases
router.get("/purchases", function (req, res) {
  db("SELECT * FROM purchases;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// Use a query param to GET all purchases with the same payment type, vender, date, reimb_submitted, or reimb_received values
router.get("/purchases/production/:production_id", async function (req, res) {
  //if the variable comes from the url/path it is stored in req.params
  const { production_id } = req.params;
  console.log(req.query);
  let defaultQuery = `SELECT
    productions.title,
    productions.budget,
    purchases.date,
    purchases.order_num,
    purchases.vender,
    purchases.items,
    purchases.description,
    purchases.payment_type,
    purchases.total,
    purchases.reimb_submitted,
    purchases.reimb_received
    FROM purchases LEFT JOIN productions 
    ON purchases.production_id = productions.id
    WHERE purchases.production_id = ${production_id}`;
  if (req.query.category && req.query.value) {
    defaultQuery = `${defaultQuery} AND purchases.${req.query.category} = '${req.query.value}'`;
  }
  const results = await db(`${defaultQuery};`);
  if (!results.data.length) {
    res.send({ message: "Show not found." });
  }
  // treat the data before sending it back
  // most often used props of req obj: headers, body, params, query
  const purchasesArray = [];
  for (let purchase of results.data) {
    purchasesArray.push({
      date: purchase.date,
      order_num: purchase.order_num,
      vender: purchase.vender,
      items: purchase.items,
      description: purchase.description,
      payment_type: purchase.payment_type,
      total: purchase.total,
      reimb_submitted: purchase.reimb_submitted,
      reimb_received: purchase.reimb_received,
    });
  }

  const response = {
    production: results.data[0]?.production,
    purchases: purchasesArray,
  };
  res.send(response);
});

// PUT a modified show_id, date, vender, payment type, or purchase total
router.put("/purchases/:id", async function (req, res) {
  let purchaseId = req.params.id;

  try {
    // Get the modified purchase from the request body
    let {
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
    let sql = `
      UPDATE purchases
      SET
      production_id = ${production_id},
      date = ${date},
      order_num = ${order_num},
      vender = '${vender}',
      items = ${items},
      description = '${description}',
      payment_type = '${payment_type}',
      total = ${total},
      reimb_submitted = ${reimb_submitted},
      reimb_received = ${reimb_received}
      WHERE id = ${purchaseId}
    `;
    await db(sql); // do UPDATE and ignore the result
    // Return updated array of purchases
    let result = await db("SELECT * FROM purchases");
    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST a new purchase (similar to put) route handler
router.post("/purchases", async function (req, res) {
  // Create a new purchase obj with req.body
  let {
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
  // Note: MySQL automatically generates an ID
  try {
    let sql = `
    INSERT INTO purchases (
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
    let { title, description, budget } = req.body;
    let sql = `
    INSERT INTO productions (
      title,
      description,
      budget)
    VALUES(
      '${title}',
      '${description}',
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

// DELETE a purchase by id
router.delete("/purchases/:id", async function (req, res) {
  let orderId = Number(req.params.id);

  try {
    let result = await db(`SELECT * FROM purchases WHERE id = ${orderId}`);

    if (result.data.length === 1) {
      await db(`DELETE FROM purchases WHERE id = ${orderId}`);
      result = await db("SELECT * FROM purchases");
      res.send(result.data);
    } else {
      // purchase doesn't exist
      res.status(404).send({ error: "Purchase not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;

var express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/user");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

 // signup route
 router.post("/signup", async (req, res) => {
  const body = req.body;

  if (!(body.email && body.username && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  const user = new User(body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

module.exports = router;

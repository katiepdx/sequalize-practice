const { Router } = require("express");
const Player = require("../models/Player");

module.exports = Router()
  .post('/', (req, res, next) => {
    Player.create(req.body)
      .then(player => res.send(player))
      .catch(next);
  });

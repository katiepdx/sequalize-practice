// Sequelize methods - create, bulkCreate, findAll, findByPk, update (w/where), destroy (w/where)

const { Router } = require("express");
const Player = require("../models/Player");

module.exports = Router()
  .post('/', (req, res, next) => {
    Player.create(req.body)
      .then(player => res.send(player))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Player.findAll(req.body)
      .then(allPlayers => res.send(allPlayers))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Player.findByPk(req.params.id)
      .then(player => res.send(player))
      .catch(next);
  });

const { Router } = require('express');
const Positions = require('../models/Position');

module.exports = Router()
  .post('/', (req, res, next) => {
    Positions.create(req.body)
      .then(position => res.send(position))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Positions.findAll()
      .then(positions => res.send(positions))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Positions.findByPk(req.params.id)
      .then(position => res.send(position))
      .catch(next);
  });

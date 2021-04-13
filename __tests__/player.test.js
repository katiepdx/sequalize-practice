const sequelizeDb = require('../lib/utils/sequelize');
const request = require('supertest');
const app = require('../lib/app');
const Player = require('../lib/models/Player');

describe('sequalize-practice routes', () => {
  beforeEach(() => {
    // drops tables before each test
    return sequelizeDb.sync({ force: true })
      // then seeds db with two players
      .then(() => {
        Player.bulkCreate([
          {
            name: 'Alex Morgan',
            position: 'forward',
            goals: 108,
          },
          {
            name: 'Carli Lloyd',
            position: 'forward',
            goals: 124,
          },
          {
            name: 'Crystal Dunn',
            position: 'defender',
            goals: 24,
          }
        ]);
      });
  });

  it('creates a player using POST', () => {
    return request(app)
      .post('/api/v1/players')
      .send({
        name: 'Megan Rapinoe',
        position: 'forward',
        goals: 57,
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: 'Megan Rapinoe',
          position: 'forward',
          goals: 57,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('gets all players using GET', () => {
    return request(app)
      .get('/api/v1/players')
      .then(res => {
        expect(res.body).toEqual(
          [
            {
              id: expect.any(Number),
              name: 'Alex Morgan',
              position: 'forward',
              goals: 108,
              createdAt: expect.any(String),
              updatedAt: expect.any(String)
            },
            {
              id: expect.any(Number),
              name: 'Carli Lloyd',
              position: 'forward',
              goals: 124,
              createdAt: expect.any(String),
              updatedAt: expect.any(String)
            },
            {
              id: expect.any(Number),
              name: 'Crystal Dunn',
              position: 'defender',
              goals: 24,
              createdAt: expect.any(String),
              updatedAt: expect.any(String)
            }
          ]
        );
      });
  });

  it('gets a player by id using GET', () => {
    // get player 1
    return request(app)
      .get('/api/v1/players/1')
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: 'Alex Morgan',
          position: 'forward',
          goals: 108,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('update a player using PUT', () => {
    return request(app)
      .put('/api/v1/players/1')
      .send({
        name: 'Alex Morgan',
        position: 'forward',
        goals: 108,
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: 'Alex Morgan',
          position: 'forward',
          goals: 108,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('delete a player by id', () => {
    return request(app)
      .delete('/api/v1/players/1')
      .then(res => {
        expect(res.body.message).toEqual('Delete complete');
      });
  });
});

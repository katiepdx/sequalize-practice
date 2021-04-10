const sequelizeDb = require('../lib/utils/sequelize');
const request = require('supertest');
const app = require('../lib/app');
const Player = require('../lib/models/Player');

describe('sequalize-practice routes', () => {
  beforeEach(() => {
    // drops tables before each test
    return sequelizeDb.sync({ force: true });
  });

  it('creates a player using POST', () => {
    return request(app)
      .post('/api/v1/players')
      .send({ name: 'Alex Morgan', careerGoals: 108, teams: ['Team USA', 'Orlando Pride'] })
      .then(res => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Alex Morgan',
          careerGoals: 108,
          teams: ['Team USA', 'Orlando Pride'],
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('gets all players using GET', () => {
    // bulkCreate (sequelize) - adds multiple items at a time 
    Player.bulkCreate([
      { name: 'Alex Morgan', careerGoals: 108, teams: ['Team USA', 'Orlando Pride'] },
      { name: 'Carli Lloyd', careerGoals: 124, teams: ['Team USA', 'Gotham FC'] }
    ]);
    return request(app)
      .get('/api/v1/players')
      .then(res => {
        expect(res.body).toEqual(
          [
            {
              id: expect.any(Number),
              name: 'Alex Morgan',
              careerGoals: 108,
              teams: ['Team USA', 'Orlando Pride'],
              createdAt: expect.any(String),
              updatedAt: expect.any(String)
            },
            {
              id: expect.any(Number),
              name: 'Carli Lloyd',
              careerGoals: 124,
              teams: ['Team USA', 'Gotham FC'],
              createdAt: expect.any(String),
              updatedAt: expect.any(String)
            }
          ]
        );
      });
  });

  it('gets a player by id using GET', () => {
    // add a player to the database
    // Player.create({ name: 'Alex Morgan', careerGoals: 108, teams: ['Team USA', 'Orlando Pride'] });

    Player.bulkCreate([
      { name: 'Alex Morgan', careerGoals: 108, teams: ['Team USA', 'Orlando Pride'] },
      { name: 'Carli Lloyd', careerGoals: 124, teams: ['Team USA', 'Gotham FC'] }
    ]);

    // get player 1
    return request(app)
      .get('/api/v1/players/1')
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: 'Alex Morgan',
          careerGoals: 108,
          teams: ['Team USA', 'Orlando Pride'],
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('update a player using PUT', () => {
    // create a player to update
    Player.create({ name: 'Alex Morgan', careerGoals: 10, teams: ['Team USA', 'Orlando Pride'] });

    return request(app)
      .put('/api/v1/players/1')
      .send({
        name: 'Alex Morgan',
        careerGoals: 108,
        teams: ['Team USA', 'Orlando Pride']
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: 'Alex Morgan',
          careerGoals: 108,
          teams: ['Team USA', 'Orlando Pride'],
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });
});

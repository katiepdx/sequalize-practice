const sequelizeDb = require('../lib/utils/sequelize');
const request = require('supertest');
const app = require('../lib/app');

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
});

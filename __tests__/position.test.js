const sequelizeDb = require('../lib/utils/sequelize');
const request = require('supertest');
const app = require('../lib/app');
const Position = require('../lib/models/Position');

describe('position routes test', () => {
  beforeEach(() => {
    return sequelizeDb.sync({ force: true })
      .then(() => {
        Position.bulkCreate([
          {
            position: 'goalkeeper',
            description: 'Also known as the goalie or keeper, their position is right in front of the net. Goalies are typically the last line of defense to keep the opponent from scoring. This is the only position allowed to use hands and arms to block shots and pick up the ball during gameplay, but this only applies within the designated penalty area. A goalie cannot use their hands to play the ball if a teammate passes the ball directly to them during gameplay or via a throw-in.'
          },
          {
            position: 'defender',
            description: 'The defenders are the players situated in front of the goalie. In general, a defender’s primary area of play is the defensive third of the field, closest to their own net.'
          },
          {
            position: 'midfielder',
            description: 'As you may have guessed, midfielders play mostly in the middle of the field. For this reason, they are also known as halfbacks. Their field position is in between the defenders and forwards. In the well-oiled soccer team machine, midfielders are the gears that keep the defensive and offensive lines connected and moving smoothly. This key role often sees the most action and moves the most during a game. Midfielders play both defensive and offensive roles and must be accurate passers.'
          }
        ]);
      });
  });
  it('should create a position', () => {
    return request(app)
      .post('/api/v1/positions')
      .send({
        position: 'forward',
        description: 'These players are on the front line of the playing field, closest to the opponent’s goal. They are usually the fastest on the field and must possess good ball control and scoring ability as the team’s attackers.'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          position: 'forward',
          description: 'These players are on the front line of the playing field, closest to the opponent’s goal. They are usually the fastest on the field and must possess good ball control and scoring ability as the team’s attackers.',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('should get all positions in the database using GET', () => {
    return request(app)
      .get('/api/v1/positions')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            id: expect.any(Number),
            position: 'goalkeeper',
            description: 'Also known as the goalie or keeper, their position is right in front of the net. Goalies are typically the last line of defense to keep the opponent from scoring. This is the only position allowed to use hands and arms to block shots and pick up the ball during gameplay, but this only applies within the designated penalty area. A goalie cannot use their hands to play the ball if a teammate passes the ball directly to them during gameplay or via a throw-in.',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          },
          {
            id: expect.any(Number),
            position: 'defender',
            description: 'The defenders are the players situated in front of the goalie. In general, a defender’s primary area of play is the defensive third of the field, closest to their own net.',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          },
          {
            id: expect.any(Number),
            position: 'midfielder',
            description: 'As you may have guessed, midfielders play mostly in the middle of the field. For this reason, they are also known as halfbacks. Their field position is in between the defenders and forwards. In the well-oiled soccer team machine, midfielders are the gears that keep the defensive and offensive lines connected and moving smoothly. This key role often sees the most action and moves the most during a game. Midfielders play both defensive and offensive roles and must be accurate passers.',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }
        ]));
      });
  });

  it('should get a position by id using GET', () => {
    return request(app)
      .get('/api/v1/positions/1')
      .then(res => {
        expect(res.body).toEqual({
          id: 1,
          position: 'goalkeeper',
          description: 'Also known as the goalie or keeper, their position is right in front of the net. Goalies are typically the last line of defense to keep the opponent from scoring. This is the only position allowed to use hands and arms to block shots and pick up the ball during gameplay, but this only applies within the designated penalty area. A goalie cannot use their hands to play the ball if a teammate passes the ball directly to them during gameplay or via a throw-in.',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });
});

// Source: Descriptions from https://protips.dickssportinggoods.com/sports-and-activities/soccer/soccer-101-player-positions-responsibilities

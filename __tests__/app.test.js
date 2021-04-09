const db = require('../lib/utils/database');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// import models here
const Studio = require('../lib/models/Studio');

describe('sequelize-sandbox routes', () => {
  beforeEach(() => {
    return db.sync({ force: true} );
  });

  it('creates a studio on POST', () => {
    return request(app)
    .post('/api/v1/studios')
    .send({
      name: 'Paramount',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
    })
    .then((res) => {
      expect(res.body).toEqual({
      id: 1,  
      name: 'Paramount',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      });
    });
  });

  it('GETS a studio by ID', async () => {
    await Studio.create({
      id: 1,
      name: 'Paramount',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
    });
    
    return request(app)
    .get('/api/v1/studios/1')
    .then((res) => {
      expect(res.body).toEqual({
      id: 1,
      name: 'Paramount',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      });
    });
  });

  it('GETS a list of all studios', async () => {
    await Studio.bulkCreate([
      {
        id: 1,
        name: 'Paramount',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States'
      },
      {
        id: 2,
        name: 'MGM',
        city: 'Studio City',
        state: 'CA',
        country: 'United States'
      },
    ]);
    return request(app)
    .get('/api/v1/studios')
    .then((res) => {
      expect(res.body).toEqual([
        {
          id: 1,
          name: 'Paramount',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States'
        },
        {
          id: 2,
          name: 'MGM',
          city: 'Studio City',
          state: 'CA',
          country: 'United States'
        },
      ]);
    });
  });


});

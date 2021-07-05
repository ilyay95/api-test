const assert = require('assert');
const { StatusCodes } = require('http-status-codes');
const supertest = require('supertest');
const app = require('../app');
const profession = require('../models').professions;

describe('GET /api/users', () => {
    it('return all profesion', async () => {
        const testProfesion = {
            profession: {
                profession: 'testProfession',
            }
        };

        await profession.create(testProfesion.profession);
        const professionBeforeLength = await profession.count();

        await supertest(app)
            .get('/api/users')
            .expect(StatusCodes.OK);

        const professionAfterLength = await profession.count();

        assert.strictEqual(professionBeforeLength, professionAfterLength, 'return all profession');
    });
});

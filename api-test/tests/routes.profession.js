const assert = require('assert');
const httpStatus = require('http-status-codes');
const supertest = require('supertest');
const models = require('../models')
const app = require('../app');
const Profesion = require('../models').Profesion;

describe('GET /api/users/profesion', () => {
    it('return all profesion', async () => {
        const testProfesion = {
            profession: {
                rofesion: 'testProfession',
            }
        };

        await Profesion.create(testProfesion.profesion);
        const professionBeforeLength = await Profesion.count();

        await supertest(app)
            .get('/api/users/profesion')
            .expect(httpStatus.OK);

        const professionAfterLength = await Profesion.count();

        assert.strictEqual(profesionBeforeLength, profesionAfterLength, 'return all profesion');
    });
});
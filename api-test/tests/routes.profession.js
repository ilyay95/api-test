const assert = require('assert');
const { StatusCodes } = require('http-status-codes');
const supertest = require('supertest');
const app = require('../app');
const Profesion = require('../models').professions;

// describe('GET /api/users/profesion', () => {
//     it('return all profesion', async () => {
//         const testProfesion = {
//             profession: {
//                 profesion: 'testProfession',
//             }
//         };

//         await Profesion.create(testProfesion.profesion);
//         const professionBeforeLength = await Profesion.count();

//         await supertest(app)
//             .get('/api/users/profesion')
//             .expect({ StatusCodes }.OK);

//         const professionAfterLength = await Profesion.count();

//         assert.strictEqual(professionBeforeLength, professionAfterLength, 'return all profesion');
//     });
// });

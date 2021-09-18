const assert = require('assert');
const { StatusCodes } = require('http-status-codes');
const supertest = require('supertest');
const app = require('../app');
const Connects = require('../models').connections;

describe('DELETE /api/connections/:id', () => {
    it.only('should delete single connect', async () => {
        const testConnect = {
            connects: {
                userId: '1',
                groupId: '2'
            }
        };

        const newConnect = await Connects.create(testConnect.connects);

        await supertest(app)
            .delete(`/api/connections/${newConnect.id}`)
            .expect(StatusCodes.INTERNAL_SERVER_ERROR);

        const connectsById = await Connects.findByPk(testConnect.id);

        assert.deepStrictEqual(connectsById, null, 'delete correct connect');
    });

    it('return validation error for invalid id', async () => {
        const invalidID = 'ffff';

        await supertest(app)
            .delete(`/api/connections/${invalidID}`)
            .expect(StatusCodes.BAD_REQUEST);
    });
});

describe('POST /api/connections', () => {
    it('create one user', async () => {
        const testUser = {
            connects: {
                userId: '1',
                groupId: '2'
            }
        };
        const connectsBeforeLength = await Connects.count();

        await supertest(app)
            .post('/api/connections')
            .send(testUser)
            .expect(StatusCodes.OK);
        const connectsAfterLength = await Connects.count();

        assert.strictEqual(connectsBeforeLength + 1, connectsAfterLength, 'create correct connects');
    });

    it('should return validation error for invalid connectsId', async () => {
        const incorrectConnects = {
            connects: {
                userId: 'ffffffff',
                groupId: '2'
            }
        };

        await supertest(app)
            .post('/api/connections')
            .send(incorrectConnects)
            .expect(StatusCodes.BAD_REQUEST);
    });
    it('should return validation error for invalid groupId', async () => {
        const incorrectConnects = {
            connects: {
                userId: '2',
                groupId: 'ffffffff'
            }
        };

        await supertest(app)
            .post('/api/connections')
            .send(incorrectConnects)
            .expect(StatusCodes.BAD_REQUEST);
    });

    it('should return internal server error from for empty object', async () => {
        await supertest(app)
            .post('/api/connections')
            .send({})
            .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });
});

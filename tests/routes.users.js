const assert = require('assert');
const httpStatus = require('http-status-codes');
const supertest = require('supertest');
const models = require('../models')
const app = require('../app');
const User = require('../models').User;

describe('GET /api/users', () => {
    it('return all users', async () => {
        const testUser = {
            user: {
                firstName: 'testName1',
                age: '25'
            }
        };

        await User.create(testUser.user);
        const usersBeforeLength = await User.count();

        await supertest(app)
            .get('/api/users')
            .expect(httpStatus.OK);
        const usersAfterLength = await User.count();

        assert.strictEqual(usersBeforeLength, usersAfterLength, 'return all users');
    });
});

describe('POST /api/users', () => {
    it('create one user', async () => {
        const testUser = {
            user: {
                firstName: 'Name',
                age: 30
            }
        };
        const usersBeforeLength = await User.count();

        await supertest(app)
            .post('/api/users')
            .send(testUser)
            .expect(httpStatus.OK);
        const usersAfterLength = await User.count();

        assert.strictEqual(usersBeforeLength + 1, usersAfterLength, 'create correct user');
    });
    it('should return validation error for invalid userName', async () => {
        const incorrectUser = {
            user: {
                firstName: 'N',
                age: 15,
            }
        };

        await supertest(app)
            .post('/api/users')
            .send(incorrectUser)
            .expect(httpStatus.BAD_REQUEST);
    });

});

describe('GET /api/users/:id', () => {
    it('should return single user', async () => {
        const testUser = {
            user: {
                firstName: 'testName',
                age: '25'
            }
        };
        const newUser = await User.create(testUser.user);

        const res = await supertest(app)
            .get(`/api/users/${newUser.id}`)
            .expect(httpStatus.OK);

        const firstName = res.body.user.firstName;

        assert.deepStrictEqual(newUser.firstName, firstName, 'return correct user');
    });

    it('should return validation error for invalid id', async () => {
        const invalidId = 2.5;

        await supertest(app)
            .get(`/api/users/${invalidId}`)
            .expect(httpStatus.BAD_REQUEST);
    });
});

describe('DELETE /api/users/:id', () => {
    it('should delete single user', async () => {
        const testUser = {
            user: {
                firstName: 'testName',
                age: '25'
            }
        };

        const newUser = await models.User.create(testUser.user);

        await supertest(app)
            .delete(`/api/users/${newUser.id}`)
            .expect(httpStatus.NO_CONTENT);

        const userById = await models.User.findByPk(testUser.id);

        assert.deepStrictEqual(userById, null, 'delete correct user');
    });
    it('return validation error for invalid id', async () => {
        const invalidID = -1;

        await supertest(app)
            .delete(`/api/users/${invalidID}`)
            .expect(httpStatus.BAD_REQUEST);
    });
});

const assert = require('assert');
const httpStatus = require('http-status-codes');
const supertest = require('supertest');
const models = require('../models')
const app = require('../app');
const User = require('../models').User;
const collect = require('collect.js');

describe('GET /api/users', () => {
    it('return all users', async () => {
        const testUser = {
            user: {
                firstName: 'testName1',
                age: '25'
            }
        };

        await User.create(testUser.user);
        const usersArr = await User.findAll({ raw: true });
        const collection = collect(usersArr);
        const usersBeforeLength = collection.count();

        const res = await supertest(app)
            .get('/api/users')
            .expect(httpStatus.OK);

        const usersAfter = res.body.user;
        const collectionAfter = collect(usersAfter);
        const usersAfterLength = collectionAfter.count();

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
        const usersArr = await User.findAll({ raw: true });
        const collection = collect(usersArr);
        const usersBeforeLength = collection.count();

        await supertest(app)
            .post('/api/users')
            .send(testUser)
            .expect(httpStatus.OK);

        const usersArrAfter = await User.findAll({ raw: true });
        const collectionAfter = collect(usersArrAfter);
        const usersAfterLength = collectionAfter.count();

        assert.strictEqual(usersBeforeLength + 1, usersAfterLength, 'create correct user');
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

        const userById = res.body.user.firstName;

        assert.deepStrictEqual(testUser.user.firstName, userById, 'return correct user');
    });

    it('should return validation error for invalid id', async () => {
        const invalidId = 2.5;

        await supertest(app)
            .put(`/api/users/${invalidId}`)
            .send({ user: {} })
            .expect(httpStatus.NOT_FOUND);
    });
});

describe('DELETE /api/users/delete/:id', () => {
    it('should delete single user', async () => {
        const testUser = {
            user: {
                firstName: 'testName',
                age: '25'
            }
        };

        const newUser = await models.User.create(testUser.user);

        await supertest(app)
            .delete(`/api/users/delete/${newUser.id}`)
            .expect(httpStatus.NOT_FOUND);

        const userById = await models.User.findByPk(testUser.id);

        assert.deepStrictEqual(userById, null, 'delete correct user');
    });
});

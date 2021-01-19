const assert = require('assert');
const httpStatus = require('http-status-codes');
const supertest = require('supertest');
const models = require('../models')
const app = require('../app');
const User = require('../models').User;
const usersValidation = require('../routes/validations/users');
const { validate } = require('express-validation')


describe('GET /api/users', validate(usersValidation.get), () => {
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

describe('POST /api/users', validate(usersValidation.post), () => {
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
                firstname: 'rg',
                age: '15',
            }
        };

        await supertest(app)
            .post('/users')
            .send(incorrectUser)
            .expect(httpStatus.BAD_REQUEST);
    });

});

describe('GET /api/users/:id', validate(usersValidation.get), () => {
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

describe('DELETE /api/users/delete/:id', validate(usersValidation.delete), () => {
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
    it('return validation error for invalid id', async () => {
        await supertest(app)
            .delete('/users/-1')
            .expect(httpStatus.BAD_REQUEST);
    });
});

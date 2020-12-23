const assert = require('assert');
const httpStatus = require('http-status-codes');
const supertest = require('supertest');
const models = require('../models')
const app = require('../app');
const User = require('../models').User

describe('GET /api/users', () => {
    it('return all users', async () => {
        await supertest(app)
            .get('/api/users')
            .expect(httpStatus.OK);
    });
});

describe('POST /api/users', () => {
    it('create one user', async () => {
        const res = supertest(app)
            .post('/api/users')
            .send({
                firstName: 'Name',
                age: 30
            })
            .expect(httpStatus.OK);

        // const userById = await User.findByPk(res.body.params.id);
        // assert.deepStrictEqual(testUser.user.firstName, userById.firstName, 'create correct user');
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
        const newUsers = await User.create(testUser.user);

        await supertest(app)
            .get(`/api/users/${newUsers.id}`)
            .expect(httpStatus.OK);
    });

    it('should return validation error for invalid id', async () => {
        await supertest(app)
            .put('/api/users/2.5')
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

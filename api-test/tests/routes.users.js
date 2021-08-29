const assert = require('assert');
const { StatusCodes } = require('http-status-codes');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models').users;
const Group = require('../models').groups;
const Connection = require('../models').connections;

describe('GET /api/users', () => {
    it('return all users', async () => {
        const testUser = {
            user: {
                firstName: 'testName',
                age: '25',
                professionId: '1'
            }
        };

        await User.create(testUser.user);
        const usersBeforeLength = await User.count();

        await supertest(app)
            .get('/api/users')
            .expect(StatusCodes.OK);
        const usersAfterLength = await User.count();

        assert.strictEqual(usersBeforeLength, usersAfterLength, 'return all users');
    });

    it('return users by name', async () => {
        const testUser = {
            firstName: 'name',
            age: '11',
            professionId: '1'
        };

        const user = await User.create(testUser);
        const firstName = user.firstName;
        const users = await User.findAll({ where: { firstName } });
        const usersBeforeLength = users.length;

        const res = await supertest(app)
            .get(`/api/users?firstName=${user.firstName}`)
            .expect(StatusCodes.OK);
        const usersAfter = res.body.users;
        const usersAfterLength = usersAfter.length;

        assert.strictEqual(usersBeforeLength, usersAfterLength, 'return all users');
    });

    it('validation error for invalid firstName', async () => {
        const testUser = {
            firstName: 'b',
            age: '11',
            professionId: '1'
        };
        const user = await User.create(testUser);

        await supertest(app)
            .get(`/api/users?firstName=${user.firstName}`)
            .expect(StatusCodes.BAD_REQUEST);
    });
});

describe('PUT /api/users/:id', () => {
    it('should return validation error for invalid id', async () => {
        const testUser = {
            user: {
                firstName: 'Name',
                age: 30,
                professionId: 2
            }
        };

        await supertest(app)
            .put('/api/users/15,5')
            .send(testUser)
            .expect(StatusCodes.BAD_REQUEST);
    });

    it('returning a changed user', async () => {

        let testUser = {
            user: {
                firstName: 'Name',
                age: 30,
                professionId: 3
            }
        };
        const user = await User.create(testUser.user);

        testUser = {
            user: {
                firstName: 'numer',
                age: 33,
                professionId: 3
            }
        };
        await supertest(app)
            .put(`/api/users/${user.id}`)
            .send(testUser)
            .expect(StatusCodes.OK);
        const userAfter = await User.findByPk(user.id);

        assert.strictEqual(testUser.user.firstName, userAfter.firstName, 'return correct name');
        assert.strictEqual(testUser.user.age, userAfter.age, 'return correct age');
    });
});

describe('POST /api/users', () => {
    it('create one user', async () => {
        const testUser = {
            user: {
                firstName: 'Name',
                age: 30,
                professionId: 4,
                logo: 'https://c.wallhere.com/photos/86/61/skull_demon_Latin_horned_pentagram_Satanism_devils_satanic-5549.jpg!d'
            }
        };
        const usersBeforeLength = await User.count();

        await supertest(app)
            .post('/api/users')
            .send(testUser)
            .expect(StatusCodes.OK);
        const usersAfterLength = await User.count();

        assert.strictEqual(usersBeforeLength + 1, usersAfterLength, 'create correct user');
    });

    it('should return validation error for invalid userName', async () => {
        const incorrectUser = {
            user: {
                firstName: 'Na',
                age: 15,
            }
        };

        await supertest(app)
            .post('/api/users')
            .send(incorrectUser)
            .expect(StatusCodes.BAD_REQUEST);
    });

    it('should return internal server error from for empty object', async () => {
        await supertest(app)
            .post('/api/users')
            .send({})
            .expect(StatusCodes.INTERNAL_SERVER_ERROR);
    });
});

describe('GET /api/users/:id', () => {
    it.only('should return single user', async () => {
        const testUser = {
            firstName: 'testName',
            age: '25',
            professionId: '3',
            logo: 'https://c.wallhere.com/photos/86/61/skull_demon_Latin_horned_pentagram_Satanism_devils_satanic-5549.jpg!d'
        };
        const testGroup = {
            name: 'testGroup'
        };

        const newUser = await User.create(testUser);
        const newGroup = await Group.create(testGroup);

        const testConnection = {
            userId: `${newUser.id}`,
            groupId: `${newGroup.id}`
        };

        await Connection.create(testConnection);

        const res = await supertest(app)
            .get(`/api/users/${newUser.id}`)
            .expect(StatusCodes.OK);

        const firstName = res.body.user.firstName;
        const id = res.body.user.id;
        const group = res.body.user.groups[0].connections.groupId;

        assert.deepStrictEqual(newUser.firstName, firstName, 'return correct name');
        assert.deepStrictEqual(newUser.id, id, 'rerutn correct id');
        assert.deepStrictEqual(newGroup.id, group, 'rerutn correct groupId');
    });

    it('should return validation error for invalid id', async () => {
        const invalidId = 2.5;

        await supertest(app)
            .get(`/api/users/${invalidId}`)
            .expect(StatusCodes.BAD_REQUEST);
    });
});

describe('DELETE /api/users/:id', () => {
    it('should delete single user', async () => {
        const testUser = {
            user: {
                firstName: 'testName',
                age: '25',
                professionId: '1'
            }
        };

        const newUser = await User.create(testUser.user);

        await supertest(app)
            .delete(`/api/users/${newUser.id}`)
            .expect(StatusCodes.NO_CONTENT);

        const userById = await User.findByPk(testUser.id);

        assert.deepStrictEqual(userById, null, 'delete correct user');
    });

    it('return validation error for invalid id', async () => {
        const invalidID = 'ffff';

        await supertest(app)
            .delete(`/api/users/${invalidID}`)
            .expect(StatusCodes.BAD_REQUEST);
    });
});

describe('DELETE /api/users/', () => {
    it('should delete all users', async () => {
        const testUsers = {
            firstUser: {
                firstName: 'testName',
                age: '25',
                professionId: '1'
            },
            secondUser: {
                firstName: 'test',
                age: '22',
                professionId: '1'
            },
        };
        const firstUser = await User.create(testUsers.firstUser);
        const secondUser = await User.create(testUsers.secondUser);

        await supertest(app)
            .delete(`/api/users/`)
            .expect(StatusCodes.NO_CONTENT);

        const firstUserId = await User.findByPk(firstUser.id);
        const secondUserId = await User.findByPk(secondUser.id);

        assert.deepStrictEqual(firstUserId, null, 'delete first user');
        assert.deepStrictEqual(secondUserId, null, 'delete second user');
    });
});


const assert = require('assert');
const { StatusCodes } = require('http-status-codes');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models').users;

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
     it('return all users', async () => {
        const testUser = {
                firstName: 'name',
                age: '11',
                professionId: '1'
        };

        const user = await User.create(testUser);
        const firstName = user.firstName
        const users = await User.findAll({ where: { firstName } }).length;
        const num = users.length;
       
        const res = await supertest(app)
            .get(`/api/users?firstName=${user.firstName}`)
            .expect(StatusCodes.OK);
        const usersAfterLength = res.body.users;
        const numAft = usersAfterLength.length;
    
        assert.strictEqual(num, numAft , 'return all users');
    });
     it.only('return all users', async () => {
        const testUser = {
                firstName: '1111',
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
                age: 30
            }
        };

        await supertest(app)
            .put('/api/users/15,5')
            .send(testUser)
            .expect(StatusCodes.BAD_REQUEST);
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
            .expect(StatusCodes.OK);
        const usersAfterLength = await User.count();

        assert.strictEqual(usersBeforeLength +1, usersAfterLength, 'create correct user');
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
});

describe('GET /api/users/:id', () => {
    it('should return single user', async () => {
        const testUser = {
            firstName: 'testName',
            age: '25',
            professionId: '3'
        };
        
        const newUser = await User.create(testUser);
        console.log(newUser.id, "string");
        const res = await supertest(app)
            .get(`/api/users/${newUser.id}`)
            .expect(StatusCodes.OK);

        const firstName = res.body.users;

        assert.deepStrictEqual(newUser.firstName, firstName, 'return correct user');
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

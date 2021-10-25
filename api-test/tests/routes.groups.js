const assert = require('assert');
const { StatusCodes } = require('http-status-codes');
const supertest = require('supertest');
const app = require('../app');
const Group = require('../models').groups;

describe('GET /api/groups', () => {
    it('return all groups', async () => {
        const testGroup = {
            group: {
                name: 'testName',
            }
        };

        await Group.create(testGroup.group);
        const groupsBeforeLength = await Group.count();

        await supertest(app)
            .get('/api/groups')
            .expect(StatusCodes.OK);
        const groupsAfterLength = await Group.count();

        assert.strictEqual(groupsBeforeLength, groupsAfterLength, 'return all groups');
    });

    describe('GET /api/groups/:id', () => {
        it('should return single group', async () => {

            const testGroup = {
                name: 'testGroup'
            };

            const newGroup = await Group.create(testGroup);

            const res = await supertest(app)
                .get(`/api/groups/${newGroup.id}`)
                .expect(StatusCodes.OK);

            const group = res.body.group.name;

            assert.deepStrictEqual(testGroup.name, group, 'rerutn correct group');
        });

        it('should return validation error for invalid id', async () => {
            const invalidId = 2.5;

            await supertest(app)
                .get(`/api/groups/${invalidId}`)
                .expect(StatusCodes.BAD_REQUEST);
        });
    });

    describe('POST /api/groups', () => {
        it('create one user', async () => {
            const testUser = {
                group: {
                    name: 'Name'
                }
            };
            const usersBeforeLength = await Group.count();

            await supertest(app)
                .post('/api/groups')
                .send(testUser)
                .expect(StatusCodes.OK);
            const usersAfterLength = await Group.count();

            assert.strictEqual(usersBeforeLength + 1, usersAfterLength, 'create correct user');
        });

        it('should return validation error for invalid userName', async () => {
            const incorrectUser = {
                group: {
                    name: 'Na'
                }
            };

            await supertest(app)
                .post('/api/groups')
                .send(incorrectUser)
                .expect(StatusCodes.BAD_REQUEST);
        });

        it('should return internal server error from for empty object', async () => {
            await supertest(app)
                .post('/api/groups')
                .send({})
                .expect(StatusCodes.INTERNAL_SERVER_ERROR);
        });
    });

});

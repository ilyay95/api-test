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

});

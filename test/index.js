const server = require('../index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const database = require('./../main-database.js');

chai.use(chaiHttp);

describe('api', () => {
    beforeEach(() => {
        database.reset();
    });

    describe('/entities/create', () => {
        it('should create entity', async () => {
            const result = await chai.request(server).post('/entities/create');

            expect(result).to.have.status(200);
        });
    });

    describe('/entities/index', () => {
        let partialMatchEntity, completeMatchEntity;

        const componentNames = ['mew', 'maw'];

        const action = async () => {
            return await chai.request(server)
                             .post('/entities/index')
                             .send({ componentNames });
        };

        beforeEach(() => {
            partialMatchEntity = database.create({ mew: true });
            completeMatchEntity = database.create({ mew: true, maw: true });
        });

        context('when index already exist', () => {
            it('should return indexed entities', async () => {
                database.addIndex(componentNames);
                const result = await action();

                expect(result.body.entities).to.deep.equal([completeMatchEntity]);
            });
        });

        context('when index does not exist', () => {
            it('should create index', async () => {
                await action();
                const indexName = database.componentNamesToString(componentNames);
                expect(database.indexes[indexName]).to.deep.equal([completeMatchEntity]);
            });

            it('should return indexed entities', async () => {
                const result = await action();

                expect(result.body.entities).to.deep.equal([completeMatchEntity]);
            });
        });
    });

    describe('/index/create', () => {
        let componentNames, result, partialMatchEntity, completeMatchEntity, falsyEntity;

        beforeEach(async () => {
            componentNames = ['mew', 'maw', 'other'];

            partialMatchEntity = database.create({ mew: true, maw: true, pew: true });
            completeMatchEntity = database.create({ mew: true, maw: true, other: {} });
            falsyEntity = database.create({ mew: true, maw: true, other: false });

            result = await chai.request(server)
                                  .post('/index/create')
                                  .send({ componentNames });
        });

        it('should add index', () => {
            const indexName = database.componentNamesToString(componentNames);

            expect(database.indexes[indexName]).to.deep.equal([completeMatchEntity]);
        });
    });
});

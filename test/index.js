const server = require('../index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

describe('/entities/create', () => {
    it('should create entity', async () => {
        const res = await chai.request(server).post('/entities/create', { mew: 5 });

        expect(res).to.have.status(200);
    });
});

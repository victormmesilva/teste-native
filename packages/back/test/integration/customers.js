require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const BASE_URL = `${process.env.BASE_URL}:${process.env.API_PORT}/api`;

chai.use(chaiHttp);
chai.should();

describe('Customers - Endpoints', () => {
  describe('GET /customers', () => {
    it('deve retornar todos os clientes - 200', done => {
      chai.request(BASE_URL)
        .get('/customers')
        .end((err, res) => {
          chai.assert.isNull(err);
          chai.assert.isNotEmpty(res.body);
          res.should.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('deve retornar um cliente existente - 200', (done) => {
      chai.request(BASE_URL)
        .get('/customers/1')
        .end((err, res) => {
          chai.assert.isNull(err);
          chai.assert.isNotEmpty(res.body);
          res.should.have.status(200);

          expect(res.body).to.be.an('object');

          res.body.should.have.property('id');
          res.body.should.have.property('first_name');
          res.body.should.have.property('last_name');
          res.body.should.have.property('email');
          res.body.should.have.property('gender');
          res.body.should.have.property('company');
          res.body.should.have.property('city');
          res.body.should.have.property('title');

          done();
        });
    });
  });
});
/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../../models';
import { goodUserData } from '../../fixtures/user';


chai.use(chaiHttp);
const { expect } = chai;
const { User, sequelize } = models;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

before(async () => {
  try {
    await User.create(goodUserData);
  } catch (error) {
    console.log(error);
  }
});

describe('User SignIn', () => {
  it('should return 404 for a user that does not exist', (done) => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({ email: 'ututu@rr.com', password: 'tetete123' })
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body)
          .to.have.property('message')
          .equal('User does not exist');
        done();
      });
  });

  it('should not allow wrong user credentials', (done) => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send({ email: goodUserData.email, password: 'tetete123' })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body)
          .to.have.property('message')
          .equal('User credentials are invalid');
        done();
      });
  });

  it('should sign in a user and save token in the cookie', (done) => {
    chai
      .request(app)
      .post('/v1/auth/login')
      .send(goodUserData)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.be.an('object');
        expect(res.body)
          .to.have.property('success')
          .equal(true);
        done();
      });
  });
});

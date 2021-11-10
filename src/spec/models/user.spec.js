/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../../models';
import { newUser } from '../../fixtures/user';


chai.use(chaiHttp);
const { expect } = chai;
const { User, sequelize } = models;

before(async () => {
  await sequelize.sync({ force: true });
});

const modelTest = describe('Model - User', () => {
  describe('Create users successfully', () => {
    it('should create a new user', async () => {
      let user;

      try {
        user = await User.create(newUser);
      } catch (error) {
        console.log(error);
      }
      expect(user.email).to.equal(newUser.email);
    });


    it('should allow valid email patterns', async () => {
      const newUser1 = { ...newUser, email: 'lewislulu@gmail.com' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        console.log(error);
      }
      expect(user.email).to.equal(newUser1.email);
    });

    it('should hash password', async () => {
      const newUser1 = { ...newUser, username: 'lulu3', email: 'lewislulu1@gmail.com' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        console.log(error);
      }

      expect(user.password).to.not.equal(undefined);
      expect(user.password).to.not.equal(newUser1.password);
    });
  });

  describe('Deny user creation', () => {
    it('should not allow invalid emails pattern', async () => {
      const newUser1 = { ...newUser, email: 'google' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        expect(user).to.equal(undefined);
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('Email field must be an email.');
      }
    });

    it('should not allow duplicate emails', async () => {
      const newUser1 = { ...newUser, username: 'xxx' };

      let user;

      try {
        user = await User.create(newUser1);
      } catch (error) {
        expect(user).to.equal(undefined);
        expect(error).to.be.an.instanceof(Error);
        expect(error.errors[0].message).to.equal('email must be unique');
      }
    });
  });
});

export default modelTest;

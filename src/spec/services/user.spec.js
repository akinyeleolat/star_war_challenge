/* eslint-disable no-console */
import chai from 'chai';
import chaiHttp from 'chai-http';
import UserServices from '../../services/User';


chai.use(chaiHttp);
const { expect } = chai;


const serviceTest = describe('Services - User', () => {
  const UserServicesInstance = new UserServices();

  describe('Create instance of service', () => {
    it('should create instance of instance service', async () => {
      expect(UserServicesInstance).to.not.equal(null);
    });
    it('Exposes the authenticateUser method', () => {
      expect(UserServicesInstance.authenticateUser).to.not.equal(undefined);
      expect(UserServicesInstance.authenticateUser).to.be.instanceOf(Function);
    });
  });
});

export default serviceTest;

import model from '../models';
import AbstractClass from './AbstractClass';

const { UserType } = model;
/**
 * @class SubjectServices
 * @extends {AbstractClass}
 */
class UserTypeServices extends AbstractClass {
  /**
   * initiate
   * @param {*} Subject model
   */
  constructor() {
    super();
    this.DataModel = UserType;
  }
}

export default UserTypeServices;

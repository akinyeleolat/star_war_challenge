import uuidV4 from 'uuid/v4';

const UserType = {
  up: queryInterface => queryInterface.bulkInsert('UserTypes', [
    {
      id: '4761b6fb-3632-4cc4-899b-f97953527cd0',
      typeName: 'defaults_user',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'd6088e9e-b519-4693-a862-bb642ed332a6',
      typeName: 'defaults_admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      typeName: 'superAdmin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('UserTypes', null, {})
};

// npx sequelize-cli db:seed --seed seed-userType

export default UserType;

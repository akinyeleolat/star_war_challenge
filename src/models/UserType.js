const userType = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    typeName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Category name is required.'
        },
        isAlpha: {
          msg: 'Category can only be a string.'
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  UserType.associate = (models) => {
    UserType.hasMany(models.User, {
      foreignKey: 'userTypeId',
      as: 'userList'
    });
  };
  return UserType;
};
export default userType;

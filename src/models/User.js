import { hashPassword } from '../utils';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email field must be an email.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required.'
          }
        }
      },
    },
    {}
  );

  User.beforeCreate(async (newUser) => {
    newUser.password = hashPassword(newUser.password);
  });

  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // User.hasMany(models.Booking, {
    //   foreignKey: 'userId',
    //   target: 'id',
    //   onDelete: 'CASCADE'
    // });
  };
  return User;
};

export default user;

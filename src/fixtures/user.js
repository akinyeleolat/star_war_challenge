export const newUser = {
  email: 'lewislulu@yahoo.com',
  password: '12345678'
};

export const goodUserData = {
  email: 'testing@carbooking.com',
  password: 'testing123'
};

export const emptyUserData = {
  email: '',
  password: ''
};

export const getUserData = args => ({
  ...goodUserData,
  ...args
});

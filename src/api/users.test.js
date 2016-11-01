import users from './users';

it('get test user', () => {
  expect(users.find({ id: 1}).firstName).toEqual('string' );
});

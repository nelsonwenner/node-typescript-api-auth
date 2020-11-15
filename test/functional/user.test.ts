import { User } from '@src/app/models/users';

describe('User functional tests', () => {

  beforeEach(async () => await User.deleteMany({}));

  describe('When creating a new user', () => {
    it('should successfully create a new user', async () => {
      const newUser = {
        name: 'Nelson Wenner',
        email: 'wenner@gmail.com',
        password: '123456'
      };
      
      const { status } = await global.testRequest
        .post('/users')
        .send(newUser);
    
      expect(status).toBe(201);
    });
    it('should return 422 when there is a validation error', async () => {
      const newUser = {
        email: 'wenner@gmail.com',
        password: '123456'
      };
      
      const { body, status } = await global.testRequest
        .post('/users')
        .send(newUser);
    
      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error: 'User validation failed: name: Path `name` is required.'
      })
    });
    it('should return 409 when the email already exists', async () => {
      const newUser = {
        name: 'Nelson Wenner',
        email: 'wenner@gmail.com',
        password: '123456'
      };
      
      await global.testRequest.post('/users').send(newUser);
      const { body, status } = await global.testRequest
        .post('/users')
        .send(newUser);
      console.log("TESTS => ", body)
      expect(status).toBe(409);
      expect(body).toEqual({
        code: 409,
        error: 'User validation failed: email: already exists in the database.'
      })
    });
  })
});

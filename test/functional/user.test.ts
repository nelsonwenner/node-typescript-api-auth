import { User } from '@src/app/models/users';
import AuthService from '@src/app/services/auth.service';

describe('User functional tests', () => {

  beforeEach(async () => await User.deleteMany({}));

  describe('When creating a new user', () => {
    it('should successfully create a new user with encrypted password', async () => {
      const newUser = {
        name: 'Nelson Wenner',
        email: 'wenner@gmail.com',
        password: '123456'
      };
      
      const { body, status } = await global.testRequest
        .post('/users')
        .send(newUser);

      expect(status).toBe(201);

      const currentUser = await User.findById(body.id);
      
      await expect(
        AuthService.comparePassword(newUser.password, `${currentUser?.password}`)
      ).resolves.toBeTruthy();
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

      expect(status).toBe(409);
      expect(body).toEqual({
        code: 409,
        error: 'User validation failed: email: already exists in the database.'
      })
    });
  })

  describe('when authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const newUser = {
        name: 'Nelson Wenner',
        email: 'wenner@gmail.com',
        password: '123456'
      };

      await new User(newUser).save();
      const response = await global.testRequest
        .post('/users/auth')
        .send({ email: newUser.email, password: newUser.password });
  
      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });
  });
});

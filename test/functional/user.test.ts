describe('User functional tests', () => {

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
  })
});

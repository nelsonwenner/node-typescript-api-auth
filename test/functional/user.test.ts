describe('User functional tests', () => {
  it('should return a success create user code 201', async () => {
    const { status } = await global.testRequest.post('/users');
    expect(status).toBe(201);
  });
});
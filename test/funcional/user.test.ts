import supertest from "supertest";

describe('User functional tests', () => {
  it('should return a user data', async() => {
    const { body, status } = await supertest(app).get('/users');
    expect(status).toBe(201);
  });
});

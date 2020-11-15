import { authMiddleware } from '@src/app/middlewares/auth.middleware';
import AuthService from '@src/app/services/auth.service';

describe('AuthMiddleware', () => {
  it('should verify a JWT token and call the next middleware', () => {
    const jwtToken = AuthService.generateToken({data: 'fake'});
    const reqFake = {
      headers: {
        'x-access-token': jwtToken
      }
    }
    const resFake = {}
    const nextFake = jest.fn();
    authMiddleware(reqFake, resFake, nextFake);
    expect(nextFake).toHaveBeenCalled();
  });
})
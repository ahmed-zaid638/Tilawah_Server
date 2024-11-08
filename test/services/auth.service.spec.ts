import {describe, expect, test, vi} from "vitest";
import {AuthService} from "../../src/services/auth.service";
import {UserService} from "../../src/services/user.service";
import {mock} from "vitest-mock-extended";

describe('Authorization service test', () => {
    vi.mock('../../src/services/user.service')
    vi.stubEnv('JWT_SECRET', Buffer.from('test').toString('base64'))
    const userService = mock<UserService>();
    const authService = new AuthService(userService);
    test('test create user', async () => {
        authService.register({name: 'test', email: 'test@test.com', password: 'test_password'});
        // @ts-ignore
        userService.createUser.mockImplementation(() => Promise.resolve({
            name: 'test', email: 'test@test.com', password: 'test_password', googleId: null, profilePic: null
        }));
        //expect(userService.createUser).toHaveBeenCalledWith({name: 'test', email: 'test@test.com', password: 'test_password', googleId: null, profilePic:
        // null});
        expect(userService.createUser).toBeCalled();
    });
});

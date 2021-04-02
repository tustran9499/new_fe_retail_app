import http from '../../common/sevices';
import { LoginDto } from '../account/account.dto';
import { DEFAULT_API } from '../account/router.enum';

class AuthenticateService {
  accountPrefix: string = DEFAULT_API.PREFIX;

  public async login(model: LoginDto) {
    const result = await http.post(`${this.accountPrefix}/login`, model);
    return result.data;
  }

  public async validateToken(token: string) {
    const result = await http.post(`${this.accountPrefix}/check-token`, {
      token,
    });
    return result.data?.result;
  }

  public async validateResetToken(token: string) {
    const result = await http.post(`${this.accountPrefix}/check-reset-token`, {
      token,
    });
    return result.data?.result;
  }

  public async validateEmailToken(token: string) {
    const result = await http.get(`${this.accountPrefix}/verify-email/${token}`);
    return result.data;
  }
}

export default new AuthenticateService();

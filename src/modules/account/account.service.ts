import http from "../../common/sevices";
import { removeConfirmationFields } from "../../common/utils/apis.util";
import { CreateUserDto } from "./account.dto";
import { DEFAULT_API } from "./router.enum";

class AccountService {
  accountPrefix: string = DEFAULT_API.PREFIX;

  public async getAccounts(skip: number, take: number) {
    console.log("debug");
    const result = await http.get(`${this.accountPrefix}/`, {
      params: {
        skip: skip,
        take: take,
      },
    });
    return result.data;
  }

  public async register(model: CreateUserDto) {
    const excludedModel = removeConfirmationFields(model);
    const result = await http.post(
      `${this.accountPrefix}/`,
      excludedModel
    );
    console.log(result)
    return result.data;
  }
}

export default new AccountService();

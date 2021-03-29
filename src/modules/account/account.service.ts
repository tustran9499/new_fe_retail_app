import http from "../../common/sevices";

class AccountService {
  accountPrefix: string = "https://warehouse-retail.herokuapp.com/api/accounts";

  public async getAccounts(skip: number, take: number) {
    const result = await http.get(`${this.accountPrefix}/`, {
      params: {
        skip: skip,
        take: take,
      },
    });
    return result.data;
  }
}

export default new AccountService();

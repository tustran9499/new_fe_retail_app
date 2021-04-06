import React from 'react';
import { observable, action } from 'mobx';
import accountService from './account.service';
import { CreateUserDto } from './account.dto';

class AccountStore {
  @observable accounts: Account[] = [];
  @observable totalCount: number = 0;
  @observable createUserForm: CreateUserDto = {
    email: '',
    password: '',
    homephone: '',
  };

  @action
  async getAccounts(skip: number, take: number) {
    let data: any = [];
    data = await accountService.getAccounts(skip, take);
    this.accounts = data[0];
    this.totalCount = data[1];
  }

  @action
  async setCreateUserForm(data: CreateUserDto) {
    this.createUserForm = data;
  }

  @action
  async register() {
    const data = await accountService.register(this.createUserForm);
    return data;
  }

  @action
  async resetCreateUserForm() {
    this.createUserForm = {
      email: '',
      password: '',
      homephone: '',
    };
  }
}
  
  export default new AccountStore();
  
  export const AccountStoreContext = React.createContext(new AccountStore());
  
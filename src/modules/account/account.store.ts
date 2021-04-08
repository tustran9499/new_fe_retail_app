import React from 'react';
import { observable, action } from 'mobx';
import accountService from './account.service';
import { CreateUserDto, UpdateAccountRequestDto } from './account.dto';

class AccountStore {
  @observable accounts: Account[] = [];
  @observable totalCount: number = 0;
  @observable createUserForm: CreateUserDto = {
    email: '',
    password: '',
    homephone: '',
  };
  @observable accountForm: UpdateAccountRequestDto = {};
  @observable currentUserDetail: any = null;

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

  @action
  async uploadAvatar(formData: any, id: number) {
    const data = await accountService.uploadAvatar(formData, id);
    return data;
  }

  @action
  async setAccountForm(data: any) {
    this.accountForm.phoneNumber = data.phoneNumber;
    this.accountForm.firstName = data.firstName;
  }

  @action
  async getAccountInfo(id: number) {
    const data = await accountService.getAccountInfo(id);
    this.currentUserDetail = data;
    return data;
  }

  @action
  async updateAccount(id: number) {
    const data = await accountService.updateAccount(this.accountForm, id);
    return data;
  }

  @action
  async deleteAccountFile(id: number, type: number) {
    const data = await accountService.deleteFiles(id, type);
    return data;
  }
}
  
  export default new AccountStore();
  
  export const AccountStoreContext = React.createContext(new AccountStore());
  
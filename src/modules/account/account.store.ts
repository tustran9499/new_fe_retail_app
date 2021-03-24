import React from 'react';
import { observable, action } from 'mobx';
import accountService from './account.service';

class AccountStore {
    @observable accounts: Account[] = [];
    @observable totalCount: number = 0;
  
    @action
    async getAccounts(skip: number, take: number) {
        let data: any = [];
        data = await accountService.getAccounts(skip, take);
        this.accounts = data[0];
        this.totalCount = data[1];
    }
  }
  
  export default new AccountStore();
  
  export const AccountStoreContext = React.createContext(new AccountStore());
  
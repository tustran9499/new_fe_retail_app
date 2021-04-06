import React from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

import CustomerMyAccount from '@/modules/customer/components/MyAccount';
import { AuthenticationStoreContext } from '../../../authenticate/authentication.store';
import { I18N } from '../../../../i18n.enum';
import AdminWrapper from '../../../admin-account/components/AdminWrapper';
import { pageSizeOptions } from '../../../../common/constants/paging.constants';
import { ACTION_MODE } from '../../../../common/enums/action.enum';
const SetupCustomerPage = () => {
  const authStore = React.useContext(AuthenticationStoreContext);

  const {
    MENU_ACCOUNT_SETUP,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
  } = I18N;

  React.useEffect(() => {}, [
    authStore.loggedUser,
  ]);

  return (
    <>
      <AdminWrapper pageTitle={MENU_ACCOUNT_SETUP}>
        {authStore.loggedUser && (
          <>
            <MyAccount
            />
          </>
        )}
      </AdminWrapper>
    </>
  );
};

export default observer(SetupCustomerPage);

import React from 'react';
import { observer } from 'mobx-react-lite';
import CustomerAccountForm from '@/modules/customer/components/AccountForm';
import { toast } from 'react-toastify';
import bsCustomFileInput from 'bs-custom-file-input';
import { AuthenticationStoreContext } from '../../../authenticate/authentication.store';
import { I18N } from '../../../../i18n.enum';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  handleChangeType?: any;
  companyType: boolean;
}

const MyAccount = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Props of Component
   */
  const { className, children } = props;
  const { MESSAGES_UPDATE_SUCCESS, MESSAGES_DELETE_SUCCESS } = I18N;

  const [avatar, setAvatar] = React.useState({
    file: null,
  });

  const [initData, setInitData] = React.useState<any>(null);

  const handleSubmit = async (values: any) => {
    customerStore.setAccountForm(values);
    const result = await uploadDriverFiles();
    if (result) {
      const data = await customerStore.updateAccount(authStore.loggedUser.id);
      if (data) {
        const user = await customerStore.getAccountInfo();
        authStore.setLoggedUser(user ?? authStore.loggedUser);
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
      }
    }
  };

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = async (type: REFERENCE_TYPE) => {
    if (type === REFERENCE_TYPE.CUSTOMER_ID_CARD_FRONT_IMAGE) {
      const result = customerStore.deleteAccountFile(
        authStore.loggedUser.id,
        REFERENCE_TYPE.CUSTOMER_ID_CARD_FRONT_IMAGE
      );
      if (result) {
        authStore.loggedUser.frontCardUrl = '';
        toast.dismiss();
        bsCustomFileInput.init();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
    if (type === REFERENCE_TYPE.CUSTOMER_ID_CARD_BACK_IMAGE) {
      const result = customerStore.deleteAccountFile(
        authStore.loggedUser.id,
        REFERENCE_TYPE.CUSTOMER_ID_CARD_BACK_IMAGE
      );
      if (result) {
        authStore.loggedUser.backCardUrl = '';
        toast.dismiss();
        bsCustomFileInput.init();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
    if (type === REFERENCE_TYPE.CUSTOMER_PROFILE_IMG) {
      const result = customerStore.deleteAccountFile(
        authStore.loggedUser.id,
        REFERENCE_TYPE.CUSTOMER_PROFILE_IMG
      );
      if (result) {
        authStore.loggedUser.avatarUrl = '';
        toast.dismiss();
        bsCustomFileInput.init();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
  };

  const handleUploadCardFront = (event: any) => {
    setCardFront({ file: event.target.files[0] });
  };

  const handleUploadCardBack = (event: any) => {
    setCardBack({ file: event.target.files[0] });
  };

  const handleUploadAvatar = (event: any) => {
    setAvatar({ file: event.target.files[0] });
  };

  React.useEffect(() => {
    if (authStore.loggedUser) {
      authStore.loggedUser.cardNo = authStore.loggedUser.cardNo ?? '';
      authStore.loggedUser.phoneNumber = authStore.loggedUser.phoneNumber ?? '';
      authStore.loggedUser.email = authStore.loggedUser.email ?? '';
      authStore.loggedUser.firstName = authStore.loggedUser.firstName ?? '';
      setInitData(authStore.loggedUser);
    }
  }, [authStore.loggedUser]);

  return (
    <>
      {initData && (
        <CustomerAccountForm
          className={className}
          children={children}
          handleSubmitForm={handleSubmit}
          initialValues={initData}
          handleUploadCardFront={handleUploadCardFront}
          handleUploadCardBack={handleUploadCardBack}
          handleUploadAvatar={handleUploadAvatar}
          handleDeleteFiles={handleDelete}
          handleChangeType={handleChangeType}
          companyType={companyType}
        />
      )}
    </>
  );
};

export default observer(MyAccount);

import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { AccountStoreContext } from '../../../../modules/account/account.store';
import OnePage from '../../../../modules/theme/components/OnePage';
import DefaultRegisterForm from '../../../../modules/account/components/DefaultRegisterForm';
import { DEFAULT_ROUTERS } from '../../../../modules/account/router.enum';
import { THANKYOU_ACTION } from '../../../../modules/account/account.enum';
import { CreateUserDto } from '../../../../modules/account/account.dto';
const CreateAccountPage = () => {
  const accountStore = React.useContext(AccountStoreContext);
  const history = useHistory();

  /*
   * Setting required fields of register form
   * @params: void
   * @return: json
   */
  const requiredFields = {
    email: true,
    password: true,
    confirmPassword: true,
    phone: false,
  };

  /*
   * Action of Sign up button
   * @params: void
   * @return: void
   */
  const handleSignUp = async (values: any) => {
    const createUserData: CreateUserDto = {
      email: values.email.trim(),
      password: values.password,
      homephone: values.phone,
    };

    accountStore.setCreateUserForm(createUserData);
    const result = await accountStore.register();
    if (result) {
      accountStore.resetCreateUserForm();
      history.push(DEFAULT_ROUTERS.THANKYOU + THANKYOU_ACTION.REGISTER);
    }
  };

  return (
    <>
      <OnePage title="Register">
        <DefaultRegisterForm
          handleRegister={handleSignUp}
          required={requiredFields}
        />
      </OnePage>
    </>
  );
};

export default observer(CreateAccountPage);

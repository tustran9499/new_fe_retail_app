import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import OnePage from '../../../../modules/theme/components/OnePage';
import DefaultLoginForm from '../../../../modules/account/components/DefaultLoginForm';
import { DEFAULT_ROUTERS } from '../../../../modules/account/router.enum';
import { AuthenticationStoreContext } from '../../../../modules/authenticate/authentication.store';
import { LoginDto } from '../../../../modules/account/account.dto';

const LoginAccountPage = () => {
  const history = useHistory();
  const authenticationStore = React.useContext(AuthenticationStoreContext);

  /*
   * Action of login button
   * @params: void
   * @return: void
   */
  const handleLogin = (values: any) => {
    const loginFormValue: LoginDto = {
      email: values.email,
      password: values.password,
    };
    authenticationStore.setLoginFormValue(loginFormValue);
    authenticationStore.login(history, DEFAULT_ROUTERS.SETUP);
  };

  /*
   * Action of forgot password link
   * @params: void
   * @return: void
   */
  const handleForgotPassword = () => {
    history.push(DEFAULT_ROUTERS.FORGOT_PASSWORD);
  };

  const [userEmail, setUserEmail] = React.useState('');

  /*
   * Action of Sign up button
   * @params: void
   * @return: void
   */
  const handleSignUp = () => {
    history.push(DEFAULT_ROUTERS.CREATE);
  };

  const [initialValues, setInitValues] = React.useState<any>({
    email: authenticationStore?.tmpUser?.email ?? '',
    password: '',
  });

  React.useEffect(() => {
    if (authenticationStore.tmpUser) {
      setUserEmail(authenticationStore.tmpUser.email);
      setInitValues({
        email: authenticationStore?.tmpUser?.email ?? '',
        password: '',
      });
      authenticationStore.clearTmpUser();
    }
  }, [authenticationStore, authenticationStore.tmpUser]);

  return (
    <>
      <OnePage title={'Login'}>
        <DefaultLoginForm
          handleLogin={handleLogin}
          handleForgotPassword={handleForgotPassword}
          handleSignUp={handleSignUp}
          userEmail={userEmail}
          initialValues={initialValues}
        />
      </OnePage>
    </>
  );
};

export default observer(LoginAccountPage);

import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import OnePage from '../../../../modules/theme/components/OnePage';
import DefaultLoginForm from '../../../../modules/account/components/DefaultLoginForm';
import { DEFAULT_ROUTERS } from '../../../../modules/account/router.enum';
import { AuthenticationStoreContext } from '../../../../modules/authenticate/authentication.store';
import { LoginDto } from '../../../../modules/account/account.dto';
import { Alert } from 'react-bootstrap';

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
    authenticationStore.login(history, DEFAULT_ROUTERS.ACCOUNT_MANAGE, setShowAlert);
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

  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  
  const LoginFailAlert = () => {
    if (showAlert) {
      return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    }
    return <></>
  }

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
        <LoginFailAlert />
      </OnePage>
    </>
  );
};

export default observer(LoginAccountPage);

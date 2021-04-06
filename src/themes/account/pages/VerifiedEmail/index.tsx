import React from 'react';
import { observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import IconThankYou from '../../../../modules/theme/assets/images/icon-thank-you.png'
import OnePage from '../../../../modules/theme/components/OnePage';
import { AuthenticationStoreContext } from '../../../../modules/authenticate/authentication.store';
import { I18N } from '../../../../i18n.enum';
import ThankYouContent from '../../../../modules/admin-account/components/ThankYouContent';

const VerifiedEmailPage = () => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const history = useHistory();

  /*
   * Getting parameter from the route
   */
  const { token } = useParams() as any;

  const {
    BUTTONS_LOGIN,
  } = I18N;

  React.useEffect(() => {
    authStore.validateEmailToken(token);
    const timeout = setTimeout(() => {
      history.push('/account/login');
    }, 30000);
    return () => clearTimeout(timeout);
  }, [authStore, history, token]);

  return (
    <>
      <OnePage className="thank-you-page" title='Retail System'>
        <ThankYouContent
          title={'Thank you!'}
          subTitle={'Your account has been verified'}
          iconSuccess={IconThankYou}
          btnText={(BUTTONS_LOGIN)}
          handleBtn={() => history.push('/account/login')}
        >
        </ThankYouContent>
      </OnePage>
    </>
  );
};

export default observer(VerifiedEmailPage);

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { I18N } from '../../../../i18n.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleLogin: any;
  handleForgotPassword: any;
  handleSignUp?: any;
  formTitle?: string;
  initialValues?: any;
  accountEmail?: string;
}

const LoginForm = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleLogin,
    handleForgotPassword,
    handleSignUp = false,
    formTitle = '',
    accountEmail,
    initialValues = {
      email: '',
      password: '',
    },
  } = props;

  const {
    VALIDATE_EMAIL,
    VALIDATE_REQUIRED,
    ACCOUNT_LOGIN_WELCOME,
    ACCOUNT_EMAIL,
    PLACEHOLDER_EMAIL,
    ACCOUNT_PASSWORD,
    PLACEHOLDER_PASSWORD,
    ACCOUNT_LINK_FORGOTPASSWORD,
    BUTTONS_LOGIN,
    BUTTONS_SIGNUP,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    email: yup.string().required(VALIDATE_REQUIRED).email(VALIDATE_EMAIL),
    password: yup.string().required(VALIDATE_REQUIRED),
  });

  initialValues.email = accountEmail ?? '';

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`form form-login ${className ? className : ''}`}
            style={style}
          >
            <h2 className="form-title">
              {formTitle ? formTitle : ACCOUNT_LOGIN_WELCOME}
            </h2>
            {children}

            <Form.Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="email"
                className="form-group-email"
              >
                <i className="ico ico-account-email"></i>
                <Form.Label className="form-label-required">
                  {ACCOUNT_EMAIL} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={PLACEHOLDER_EMAIL}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="password"
                className="form-group-password"
              >
                <i className="ico ico-password"></i>
                <Form.Label className="form-label-required">
                  {ACCOUNT_PASSWORD} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder={PLACEHOLDER_PASSWORD}
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="formBasicCheckbox">
                <Button
                  variant="link"
                  className="action-link"
                  onClick={handleForgotPassword}
                >
                  {ACCOUNT_LINK_FORGOTPASSWORD}
                </Button>
              </Form.Group>
            </Form.Row>
            <ButtonGroup className="form-actions">
              <Button variant="primary" type="submit">
                <span>{BUTTONS_LOGIN}</span>
                <i className="ico ico-o-next"></i>
              </Button>
              {handleSignUp && (
                <Button onClick={handleSignUp} variant="outline-primary">
                  <span>{BUTTONS_SIGNUP}</span>
                  <i className="ico ico-plus"></i>
                </Button>
              )}
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(LoginForm);

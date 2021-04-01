import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { I18N } from '../../../../i18n.enum';
import { PHONE_REGEXP } from '../../../../common/constants/rules.constants';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleRegister: any;
  handleLogin?: any;
  formTitle?: string;
  initialValues?: any;
  required?: any;
}

const RegisterForm = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleRegister,
    handleLogin = false,
    formTitle = '',
    initialValues = {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    required = {
      email: true,
      password: true,
      confirmPassword: true,
      phone: false,
    },
  } = props;

  const {
    VALIDATE_EMAIL,
    VALIDATE_REQUIRED,
    VALIDATE_CONFIRM_PASSWORD,
    VALIDATE_PHONE,
    ACCOUNT_CREATE_TITLE,
    ACCOUNT_EMAIL,
    PLACEHOLDER_EMAIL,
    ACCOUNT_PASSWORD,
    PLACEHOLDER_PASSWORD,
    ACCOUNT_CONFIRM_PASSWORD,
    PLACEHOLDER_CONFIRM_PASSWORD,
    ACCOUNT_PHONE,
    ACCOUNT_PHONE_REQUIRED,
    PLACEHOLDER_PHONE,
    BUTTONS_LOGIN,
    BUTTONS_SIGNUP,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    email: required?.email
      ? yup
          .string()
          .required((VALIDATE_REQUIRED))
          .email((VALIDATE_EMAIL))
          .trim()
      : yup.string().email((VALIDATE_EMAIL)).trim(),
    password: required?.password
      ? yup.string().required((VALIDATE_REQUIRED))
      : yup.string(),
    confirmPassword: required?.confirmPassword
      ? yup
          .string()
          .oneOf([yup.ref('password')], (VALIDATE_CONFIRM_PASSWORD))
          .required((VALIDATE_REQUIRED))
      : yup.string().oneOf([yup.ref('password')], (VALIDATE_CONFIRM_PASSWORD)),
    phone: required?.phone
      ? yup
          .string()
          .matches(PHONE_REGEXP, (VALIDATE_PHONE))
          .required((VALIDATE_REQUIRED))
      : yup.string().matches(PHONE_REGEXP, (VALIDATE_PHONE)).notRequired(),
  });

  const handleKeyDown = (e: any) => {
    const spaceBarKeyCode = 32;
    if (e.keyCode === spaceBarKeyCode) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleRegister(values);
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
            className={`form form-register ${className ? className : ''}`}
            style={style}
          >
            <h2 className="form-title">
              {formTitle ? formTitle : (ACCOUNT_CREATE_TITLE)}
            </h2>
            {children}
            <Form.Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="email"
                className="form-group-email"
              >
                <i className="ico ico-user-email"></i>
                {required.email ? (
                  <Form.Label className="form-label-required">
                    {(ACCOUNT_EMAIL)} <span>*</span>
                  </Form.Label>
                ) : (
                  <Form.Label>{(ACCOUNT_EMAIL)}</Form.Label>
                )}

                <Form.Control
                  type="text"
                  placeholder={(PLACEHOLDER_EMAIL)}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  onKeyDown={handleKeyDown}
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
                {required.password ? (
                  <Form.Label className="form-label-required">
                    {(ACCOUNT_PASSWORD)} <span>*</span>
                  </Form.Label>
                ) : (
                  <Form.Label>{(ACCOUNT_PASSWORD)}</Form.Label>
                )}
                <Form.Control
                  type="password"
                  placeholder={(PLACEHOLDER_PASSWORD)}
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
              <Form.Group
                as={Col}
                md="12"
                controlId="confirmPassword"
                className="form-group-confirm-password"
              >
                <i className="ico ico-password"></i>
                {required.confirmPassword ? (
                  <Form.Label className="form-label-required">
                    {(ACCOUNT_CONFIRM_PASSWORD)} <span>*</span>
                  </Form.Label>
                ) : (
                  <Form.Label>{(ACCOUNT_CONFIRM_PASSWORD)}</Form.Label>
                )}
                <Form.Control
                  type="password"
                  placeholder={(PLACEHOLDER_CONFIRM_PASSWORD)}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="phone"
                className="form-group-phone"
              >
                <i className="ico ico-phone"></i>
                {required.phone ? (
                  <Form.Label className="form-label-required">
                    {(ACCOUNT_PHONE_REQUIRED)} <span>*</span>
                  </Form.Label>
                ) : (
                  <Form.Label>{(ACCOUNT_PHONE)}</Form.Label>
                )}
                <Form.Control
                  type="text"
                  placeholder={(PLACEHOLDER_PHONE)}
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <ButtonGroup className="form-actions">
              <Button variant="primary" type="submit">
                <span>{(BUTTONS_SIGNUP)}</span>
                <i className="ico ico-plus"></i>
              </Button>
              {handleLogin && (
                <Button onClick={handleLogin}>
                  <span>{(BUTTONS_LOGIN)}</span>
                  <i className="ico ico-o-next"></i>
                </Button>
              )}
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(RegisterForm);

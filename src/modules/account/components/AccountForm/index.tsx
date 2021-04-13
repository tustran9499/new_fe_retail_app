import React from "react";
import { observer } from "mobx-react-lite";

import {
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import { Formik } from "formik";
import * as yup from "yup";
import bsCustomFileInput from "bs-custom-file-input";
import Image from "react-bootstrap/Image";
import {
  PHONE_REGEXP,
} from "../../../../common/constants/rules.constants";
import { AuthenticationStoreContext } from "../../../authenticate/authentication.store";
import { I18N } from "../../../../i18n.enum";
import { REFERENCE_TYPE } from "../../referenceType.enum";

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  initialValues?: any;
  handleSubmitForm?: any;
  handleUploadAvatar?: any;
  handleDeleteFiles?: any;
}

const CustomerAccountForm = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    initialValues,
    handleSubmitForm,
    handleUploadAvatar,
    handleDeleteFiles,
  } = props;

  const {
    VALIDATE_EMAIL,
    VALIDATE_PHONE,
    BUTTONS_UPDATE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    fName: yup.string().notRequired(),
    lName: yup.string().notRequired(),
    email: yup.string().email(VALIDATE_EMAIL).notRequired(),
    phoneNumber: yup
      .string()
      .matches(PHONE_REGEXP, VALIDATE_PHONE)
      .notRequired(),
  });

  const [avatar, setAvatar] = React.useState<string>("");

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    if (authStore.loggedUser) {
      setAvatar(authStore.loggedUser.avatarUrl);
    }
  }, [authStore.loggedUser]);

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`form form-custom ${className ? className : ""}`}
            style={style}
          >
            {children}
            <Form.Row className="company-info">
              <Container fluid>
                <Row>
                <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="email"
                    className="form-group-email"
                  >
                    <Form.Label className="form-label">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={values.Email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="fName"
                    className="form-group-firstName"
                  >
                    <Form.Label className="form-label">
                      Firstname
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.FName ?? ""}
                      onChange={handleChange}
                      isInvalid={!!errors.fName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fName}
                    </Form.Control.Feedback>
                  </Form.Group>
                <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="lName"
                    className="form-group-firstName"
                  >
                    <Form.Label className="form-label">
                      Lastname
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.LName ?? ""}
                      onChange={handleChange}
                      isInvalid={!!errors.lName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={2}
                    className="form-group-verifiedStatus"
                  >
                    <Form.Label className="form-label">
                    Account Status
                    </Form.Label>
                    <div className="account-status">
                      {authStore.loggedUser.EmailVerified ? 'Verified' : 'Not Verified'}
                      {console.log(authStore.loggedUser)}
                    </div>
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        <Tooltip id="tooltip-info">
                          Contact account owner to vefify or use admin page to verify
                        </Tooltip>
                      }
                    >
                      <div className="tooltip-icon">
                        <span className="ico ico-faq"></span>
                      </div>
                    </OverlayTrigger>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="avatarUrl"
                    className="form-group-avatarUrl"
                  >
                    <div className="form-image-wrapper">
                      <Form.Label className="form-label">
                        Upload Profile Avatar
                        <span className="image-size">
                        {"Image size < 3MB"}
                        </span>
                      </Form.Label>
                      {avatar && (
                        <div className="image">
                          <a
                            className="zoom-image"
                            href={avatar}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image src={`${avatar}`} />
                          </a>
                          <Button
                            className="btn-icon"
                            onClick={() => {
                              setAvatar("");
                              handleDeleteFiles(
                                REFERENCE_TYPE.PROFILE_IMG
                              );
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        </div>
                      )}
                      <Form.File
                        id="iconCompany"
                        label="Choose an image"
                        onChange={handleUploadAvatar}
                        custom
                      />
                    </div>
                  </Form.Group>
                </Row>
                {/* <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    controlId="profileUrl"
                    className="form-group-block form-group-profileUrl"
                  >
                    <Form.Label className="form-label">
                      {(CUSTOMER_PROFILE_PICTURE)}
                    </Form.Label>
                    {cardFront && (
                      <div className="image">
                        <Image src={`${cardFront}`} />
                        <Button
                          className="btn-icon"
                          onClick={() => {
                            setCardFront('');
                            handleDeleteFiles(
                              REFERENCE_TYPE.
                            );
                          }}
                        >
                          <i className="ico ico-o-close"></i>
                        </Button>
                      </div>
                    )}
                    <Form.File
                      id="profileUrl"
                      label={(BUTTONS_CHOOSE_IMAGE)}
                      onChange={handleUploadCardFront}
                      custom
                    />
                  </Form.Group>
                </Row> */}
                <ButtonGroup className="form-actions">
                  <Button variant="primary" type="submit">
                    <span>{BUTTONS_UPDATE}</span>
                    <i className="ico ico-update"></i>
                  </Button>
                </ButtonGroup>
              </Container>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(CustomerAccountForm);

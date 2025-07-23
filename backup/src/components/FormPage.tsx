import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { eventCategoryFormPage, localStorageKey, pageNameFormPage } from '../constants';
import FormValidationSchema from '../helpers/FormValidationSchema';
import { CaretRight } from '../images/icons';
import callApi from '../infrastructure/api/CallApi';
import { trackEvent, trackPageView } from '../infrastructure/tracking/GoogleAnalytics';
import { sendToOmniture } from '../infrastructure/tracking/Omniture';
import { login } from '../slices/users/actions';
import { UserDto } from '../types';
import LoadingButton from './Form/LoadingButton';
import TextField from './Form/TextField';
import Title from './Layout/Title';
import useLinkTarget from '../infrastructure/isWebView/useLinkTarget';
import Swal from 'sweetalert2';

const FormPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const linkTarget = useLinkTarget();

  useEffect(() => {
    sendToOmniture(pageNameFormPage);
    trackPageView(pageNameFormPage, '/signup');
  }, []);

  const onSubmit = (values: object) => {
    trackEvent(eventCategoryFormPage, 'Submit', 'Form');
    setIsSubmitting(true);
    callApi<UserDto>(`api/app/user/enterForm`, 'POST', values)
      .then((response) => {
        onSignUpSuccess(response.data);
      })
      .catch(({ response }: any) => {
        handleError(response);
        setIsSubmitting(false);
      });
  };

  const onSignUpSuccess = (user: UserDto) => {
    trackEvent(eventCategoryFormPage, 'Success', 'Form');
    dispatch(login(user, true));
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(user));
    } catch {}
    history.push('/your-tree');
  };

  const handleError = (response: any) => {
    let alertDescription = 'Something went wrong! Please try again.';
    trackEvent(eventCategoryFormPage, 'Error', 'Form');
    if (response && response.data && response.data.error && response.data.error.code === 'CustomError') {
      alertDescription = response.data.error.message;
    }
    Swal.fire({
      title: 'Oops!',
      text: alertDescription,
      backdrop: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="page form-page">
      <Container className="sign-up form-container">
        <Title>Enter your details</Title>
        <Formik
          initialValues={{
            firstName: '',
            emailAddress: '',
            crownMediaOptIn: true,
          }}
          validationSchema={FormValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form id="EntryForm" noValidate>
              <Row>
                <Col xs={12} sm={{ span: 6, offset: 0 }}>
                  <div className="text-field">
                    <TextField name="firstName" label="First Name" id="firstName" type="text" maxLength={100} />
                  </div>
                </Col>
                <Col xs={12} sm={{ span: 6, offset: 0 }}>
                  <div className="text-field">
                    <TextField
                      name="emailAddress"
                      label="Email Address"
                      id="emailaddress"
                      type="email"
                      maxLength={100}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={{ span: 12, offset: 0 }}>
                  <label htmlFor="crownMediaOptIn" className="checkbox-container">
                    <Field
                      name="crownMediaOptIn"
                      type="checkbox"
                      id="crownMediaOptIn"
                      checked={values.crownMediaOptIn}
                    />
                    <span className="checkmark" />
                    <p>
                      By checking this box, I acknowledge that Crown Media and its affiliated companies can email me
                      about special offers and promotions, and that I agree to Hallmark Channel's{' '}
                      <a
                        href="https://www.hallmarkchannel.com/privacy-policy"
                        target={linkTarget}
                        rel="noopener noreferrer"
                        onClick={() => trackEvent(eventCategoryFormPage, 'Click', 'Privacy')}
                      >
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a
                        href="https://www.hallmarkchannel.com/crown-media-family-networks-terms-of-use"
                        target={linkTarget}
                        rel="noopener noreferrer"
                        onClick={() => trackEvent(eventCategoryFormPage, 'Click', 'TermsOfUse')}
                      >
                        Terms of Use
                      </a>
                      .
                    </p>
                  </label>       
                </Col>
              </Row>
              <div className="form-main-action">
                <Button
                  classes={{
                    root: 'PrimaryBtn LgBtn',
                    label: 'BtnLabel',
                  }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <LoadingButton
                    isLoading={isSubmitting}
                    buttonContent={
                      <>
                        Get started <CaretRight />
                      </>
                    }
                  />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default FormPage;

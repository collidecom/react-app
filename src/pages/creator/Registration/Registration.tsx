import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import { COLTextField } from '../../../components/TextField/COLTextField';
import { COLPrimaryButton } from '../../../components/Button/COLPrimaryButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, Dialog, Typography } from '@material-ui/core';

import COLTextButton from '../../../components/Button/COLTextButton';
import COLUnderlinedButton from '../../../components/Button/COLUnderlinedButton';
import RootStore from '../../../stores/RootStore';
import { COLHeader } from '../../../components/Typography/Typography';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('Enter your display name')
    .min(3, 'Must be at least 3 characters'),
  email: Yup.string()
    .required('Enter your email')
    .email('Invalid email'),
  password: Yup.string()
    .required('Enter your password')
    .min(6, 'Must be at least 6 characters'),
  ageConsent: Yup.string()
    .required('You must be at least 13 years old'),
  rating: Yup.string()
    .min(1, 'Select mature rating'),
});
interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  ageConsent: boolean;
  rating: number;
}
const textStyle = {
  color: '#aab2bd',
  minWidth: '150px',
  fontFamily: 'MarkOT-Medium',
  fontSize: '16px',
};

const FormControlStyle = {
  margin: '0 0 0 -16px'
};
interface Props {
  
}
interface InjectedProps extends Props {
  rootStore: RootStore
}
@inject('rootStore')
@observer
class Registration extends React.Component<Props, {}> {

  get injected() {
    return this.props as InjectedProps;
  }

  state = {
    hideMature: false,
    showMature: false,
    showMatureModal: false,
  };

  componentDidMount() {

  }

  handleUserRating(name: string) {
    if (name === 'hide') {
      this.setState({
        hideMature: true,
        showMature: false
      });
    }
    else {
      this.setState({
        hideMature: false,
        showMature: true,
        showMatureModal: true,
      });
    }
    // this.props.creatorStore!.updateUserRating(name);
  }

  render() {

    const rootStore = this.injected.rootStore;
    const { registrationStore } = rootStore;

    let hideMatureClasses: string;
    if (this.state.hideMature) {
      hideMatureClasses = 'btn btn-matureGrey mature-icon mature-icon-hide active';
    }
    else {
      hideMatureClasses = 'btn btn-matureGrey mature-icon mature-icon-hide';
    }

    let showMatureClasses: string;
    if (this.state.showMature) {
      showMatureClasses = 'btn btn-matureGrey mature-icon mature-icon-show active';
    }
    else {
      showMatureClasses = 'btn btn-matureGrey mature-icon mature-icon-show';
    }
    return (
      <div>
        <div style={{opacity: 1}}>
          <COLHeader>
          Create an account
          </COLHeader>

          <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            ageConsent: false,
            rating: 0,
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values: RegisterFormValues) => {
            // local validation passed. make server calls for final validation
            registrationStore.checkDuplicate();

          }}
          render={(formikBag: FormikProps<RegisterFormValues>) => (
            <Form>
              <Field
                name="username"
                render={({ field, form }: FieldProps<RegisterFormValues>) => (
                  <>
                    <COLTextField
                      placeholder="Your Display Name"
                      fullWidth={true}
                      {...field}
                    />
                    {form.touched.username &&
                      form.errors.username &&
                      form.errors.username}
                  </>
                )}
              />
              <Field
                name='email'
                render={({ field, form }: FieldProps<RegisterFormValues>) => (
                  <>
                    <COLTextField
                    type='email'
                    placeholder='Your Email'
                    fullWidth={true}
                    {...field}
                  />
                  {form.touched.email &&
                    form.errors.email &&
                    form.errors.email}
                  </>
                )}
              />
              <Field
                name='password'
                render={({ field, form }: FieldProps<RegisterFormValues>) => (
                  <>
                    <COLTextField
                      type='password'
                      placeholder='Password'
                      fullWidth={true}
                      {...field}
                    />
                    {form.touched.password &&
                      form.errors.password &&
                      form.errors.password}
                  </>
                )}
              />
              <Field
                name='ageConsent'
                render={({ field, form }: FieldProps<RegisterFormValues>) => (
                  <>
                    <FormControlLabel
                      style={FormControlStyle}
                      control={
                        <Checkbox
                          color="primary"
                          {...field}
                          onChange={(e, checked) => {
                            form.setFieldValue(field.name, checked);
                          }}
                        />
                      }
                      label={<span style={textStyle}>I am at least 13</span>}
                    />
                    <COLUnderlinedButton>Why?</COLUnderlinedButton>
                  </>
                )}
              />
              <br/>
              <Field
                name='termsAgreed'
                render={({ field, form }: FieldProps<RegisterFormValues>) => (
                  <>
                    <FormControlLabel
                      style={FormControlStyle}
                      control={
                        <Checkbox
                          color="primary"
                          {...field}
                          onChange={(e, checked) => {
                            form.setFieldValue(field.name, checked);
                          }}
                        />
                      }
                      label={<span style={textStyle}>I agree to the</span>}
                    />
                    <COLUnderlinedButton
                      onClick={() => {
                        window.open('/terms', '_blank');
                      }}
                    >
                    Terms of Service
                    </COLUnderlinedButton>
                  </>
                )}
              />
              <Field
              name='rating'
              render={({ field, form }: FieldProps<RegisterFormValues>) => (
                <div id="mode-group" className="btn-group" data-toggle="buttons" style={{margin: '0 auto 16px auto', display: 'block', textAlign: 'center'}}>
                  <label
                    className={hideMatureClasses}
                  >
                    <input
                      type="radio"
                      name="hide"
                      value="hide-mature"
                      id="hide-mature-radio"
                      onClick={() => {
                        this.setState({
                          hideMature: true,
                          showMature: false,
                        })
                        form.setFieldValue(field.name, 2)
                      }}
                    />
                    <p className="matureText">Uploading <strong>Family <br/>Friendly </strong>Content</p>
                  </label>

                  <label
                    className={showMatureClasses}
                    data-toggle="modal"
                    data-target=".bs-mature-modal-sm"
                  >
                    <input
                      type="radio"
                      name="show"
                      value="show-mature"
                      id="show-mature-radio"
                      onClick={() => {
                        this.setState({
                          hideMature: false,
                          showMature: true,
                          showMatureModal: true,
                        });
                        form.setFieldValue(field.name, 1)
                      }}
                    />
                    <p className="matureText">Uploading <strong>Mature <br/>Rated </strong>Content</p>
                  </label>
                </div>
              )}
              />
              <div
                style={{textAlign: 'center'}}
              >
                <COLPrimaryButton
                  type="submit"
                >
                  Continue
                </COLPrimaryButton>
              </div>
            </Form>
          )}
          />

          <Dialog
            open={false}
            // onClose={() => store.toggleShowHelp('age')}
          >

            <div>
              <div style={{ padding: '16px' }}>
              Collide requires all users to be at least 13 years old before they can register an account.
              </div>
              <COLTextButton
                // onClick={() => store.toggleShowHelp('age')}
              >
                Done
              </COLTextButton>
            </div>

          </Dialog>

          <Dialog
            open={this.state.showMatureModal}
            onClose={() => {
              this.setState({
                showMature: false,
                showMatureModal: false
              });
            }}
          >
            <div className="modal-content modal-content-mature">
              <div className="modal-body text-center">
                <img src="https://assets.collide.com/images/v1/matureicons/showM_active.svg" style={{width: '64px', height: '64px', margin: '16px 0'}}/>
                <p>By turning this on, you agree that you are at least 18 years old and will upload adult oriented themes, including sexual, language, and other mature topics</p>
              </div>
              <div className="modal-footer modal-footer-mature text-center">
                <div className="text-center d-flex">
                  <button
                    type="button"
                    className="btn btn-matureAgree"
                    onClick={() => {
                      this.setState({
                        showMatureModal: false
                      });
                    }}
                  >
                    I agree
                  </button>
                  <br/>
                  <button
                    type="button"
                    className="btn btn-nevermind"
                    onClick={() => {
                      this.setState({
                        showMatureModal: false
                      });
                      this.handleUserRating('hide');
                    }}
                  >
                    Nevermind
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </div >
      </div>

    );
  }

}

export default Registration;
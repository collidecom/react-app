import * as React from 'react';
import { inject, observer } from 'mobx-react';
import CreatorStore from '../../../stores/CreatorStore';
import { URLPATHS } from '../../../util/Steps';

import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import { COLTextField } from '../../../components/TextField/COLTextField';
import { COLPrimaryButton } from '../../../components/Button/COLPrimaryButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, Dialog, Typography } from '@material-ui/core';

import ApiClient from '../../../util/ApiClient';
import COLTextButton from '../../../components/Button/COLTextButton';
import { UnderlinedLink } from '../../../components/Link/Link';
import COLUnderlinedButton from '../../../components/Button/COLUnderlinedButton';

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
});
interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  ageConsent: boolean;
}

interface Props {
  creatorStore?: CreatorStore;
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
// @inject('creatorStore')
// @observer
class Registration extends React.Component<Props, {}> {

  state = {
    hideMature: false,
    showMature: false,
    showMatureModal: false,
  };

  componentDidMount() {

  }

  checkDuplication(event: any) {

    const name = event.target.name;
    const store = this.props.creatorStore!;
    if (store.user.username || store.user.email) {

    if (name === 'username') {

      ApiClient.get('register/validate_username',
      {username: this.props.creatorStore!.user.username}).then().catch((error: string) => {
        this.props.creatorStore!.error = error;
        // this.props.creatorStore!.user.username = '';

      });
      }
      else {
        ApiClient.get('register/validate_email',
        {email: this.props.creatorStore!.user.email}).then().catch((error: string) => {
          this.props.creatorStore!.error = error;
          // this.props.creatorStore!.user.email = '';

        });
      }
    }
  }

  handleChange(event: any) {
    this.props.creatorStore!.updateUser(event.currentTarget.name, event.currentTarget.value);
  }

  handleCheck(event: any, checked: boolean) {
    this.props.creatorStore!.updateUserChecked(event.currentTarget.name, checked);
  }

  handleAgeCheck(event: any) {
    this.props.creatorStore!.updateUserChecked(event.target.name, event.target.checked);
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
    this.props.creatorStore!.updateUserRating(name);
  }

  handleSubmit = (mobile: boolean) => {
    // Check if user ticked checkboxes first.
    const onboardingStore = this.props.creatorStore!;

    if (!onboardingStore.user.termsAgreed) {
      onboardingStore.error = 'Please agree to our terms';
      return;
    }

    if (!onboardingStore.user.ageConsent) {
      onboardingStore.error = 'You must be at least 13 years old';
      return;
    }

    if (onboardingStore.user.rating === 0) {
      onboardingStore.error = 'Select mature rating';
      return;
    }

    ApiClient.get('register/validate_username', {
      username: this.props.creatorStore!.user.username
    }).then(() => {
      ApiClient.get('register/validate_email', {
        email: this.props.creatorStore!.user.email
      }).then(() => {
          this.props.creatorStore!.push(URLPATHS.CREATOR.profile);
      }).catch((error: string) => {
          this.props.creatorStore!.error = error;
        });
    }).catch((error: string) => {
        this.props.creatorStore!.error = error;
      });

  }

  render() {

    // const onboardingStore = this.props.creatorStore!;
    // const store = onboardingStore.descriptionStore;
    // const isLoading = onboardingStore.isLoading;

    let hideMatureClasses;
    if (this.state.hideMature) {
      hideMatureClasses = 'btn btn-matureGrey mature-icon mature-icon-hide active';
    }
    else {
      hideMatureClasses = 'btn btn-matureGrey mature-icon mature-icon-hide';
    }

    let showMatureClasses;
    if (this.state.showMature) {
      showMatureClasses = 'btn btn-matureGrey mature-icon mature-icon-show active';
    }
    else {
      showMatureClasses = 'btn btn-matureGrey mature-icon mature-icon-show';
    }
    return (
      <div>
        {/* {isLoading &&
          <ProgressIndicator/>
        } */}
        <div style={{opacity: 1}}>
          <Typography variant='h3'>
            Create an account
          </Typography>

          <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            ageConsent: false
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values: RegisterFormValues) => alert(JSON.stringify(values))}
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
            </Form>
          )}
          />
            <div id="mode-group" className="btn-group" data-toggle="buttons" style={{margin: '0 auto 16px auto', display: 'block', textAlign: 'center'}}>
              <label
                className={hideMatureClasses}
              >
                <input
                  type="radio"
                  name="hide"
                  value="hide-mature"
                  id="hide-mature-radio"
                  onClick={() => this.handleUserRating('hide')}
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
                  onClick={() => this.handleUserRating('show')}    
                />
                <p className="matureText">Uploading <strong>Mature <br/>Rated </strong>Content</p>
              </label>
            </div>

            {/* <label className="switch">
                <input
                  className="switch-input"
                  name="rating"
                  type="checkbox"
                  id="all_ages"
                  checked={onboardingStore.user.rating === 2}
                  onChange={(e) => this.handleAgeCheck(e)}
                />
                <span className="switch-label" data-on="NO" data-off="YES"/>
                <span className="switch-handle"/>
            </label> */}
            {/* <div className="clearfix"/> */}

          <div
            style={{textAlign: 'center'}}
          >
          <COLPrimaryButton
            type="submit"
          >
            Continue
          </COLPrimaryButton>
          </div>

          {/* </ValidatorForm> */}

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
          {/* <Dialog
            open={store.appropriateContentHelp.show}
            onClose={() => {
              onboardingStore.user.rating = 2;
              store.hideAppropriateContentAlert();
            }}
          >

            <div
              style={{textAlign: 'center'}}
            >
              <NSFWPrompt style={{ padding: '16px' }}>
              Turning this off suggests that you will be uploading content that may include sexually suggestive or adult oriented themes.
              </NSFWPrompt>
              <COLClearButton
                border={true}
                fullWidth={false}
                style={{height: '32px', marginTop: '24px'}}
                onClick={() => store.hideAppropriateContentAlert()}
              >
                I agree
              </COLClearButton><br/>
              <COLSecondaryButton
                fullWidth={false}
                style={{height: '32px', margin: '16px 0'}}
                onClick={() => {
                  onboardingStore.user.rating = 2;
                  store.hideAppropriateContentAlert();
                }}
              >
                Cancel
              </COLSecondaryButton>
            </div>

          </Dialog> */}
        </div >
      </div>

    );
  }

}

export default Registration;
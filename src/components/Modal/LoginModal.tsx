import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import { COLTextField } from '../TextField/COLTextField';
import { createStyles, withStyles } from '@material-ui/core';
import COLPrimaryButton from '../Button/COLPrimaryButton';
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { COLErrorMessage, COLInstructionHeader } from '../Typography/Typography';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Enter your email')
    .email('Invalid email'),
  password: Yup.string()
    .required('Enter your password')
    .min(6, 'Must be at least 6 characters'),
});
export interface LoginFormValues {
  email: string;
  password: string;
}

const styles = (theme: any) => createStyles({
  root: {
    // padding: '16px',
    maxWidth: '400px'
  },
});
interface Props {
    fullScreen?: boolean,
    classes?: any,
    theme?: any,
}

interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
class LoginModal extends React.Component<Props> {

  get injected() {
    return this.props as InjectedProps;
  }

  handleClose = () => {
    
    const { rootStore } = this.injected;
    const { authStore } = rootStore;
    authStore.setShowLoginModal(false);

  };

  handleChange = (event: any) => {

    const { rootStore } = this.injected;
    const { authStore } = rootStore;
    authStore.setLoginField(event.currentTarget.name, event.currentTarget.value);
    
  }

  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;

    const { rootStore } = this.injected;
    const { authStore } = rootStore;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          classes={{
            paper: classes.root
          }}
          open={authStore.showLoginModal}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          {/* <DialogTitle id="responsive-dialog-title">{"Log in"}</DialogTitle> */}
          <DialogContent>

          <COLInstructionHeader>Log in</COLInstructionHeader>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                ageConsent: false,
                termsAgreed: false,
                rating: 0,
              }}
              validationSchema={LoginSchema}
              onSubmit={(values: LoginFormValues) => {
                authStore.login();
              }}
              render={(formikBag: FormikProps<LoginFormValues>) => (
                <Form>
                  <Field
                    name='email'
                    render={({ field, form }: FieldProps<LoginFormValues>) => (
                      <>
                        <COLTextField
                          type='email'
                          placeholder='Your Email'
                          fullWidth={true}
                          {...field}
                        />
                        <COLErrorMessage>
                        {form.touched.email &&
                          form.errors.email &&
                          form.errors.email}
                          </COLErrorMessage>
                      </>
                    )}
                  />
                  <Field
                    name='password'
                    render={({ field, form }: FieldProps<LoginFormValues>) => (
                      <>
                        <COLTextField
                          type='password'
                          placeholder='Password'
                          fullWidth={true}
                          {...field}
                        />
                        <COLErrorMessage>
                        {form.touched.password &&
                          form.errors.password &&
                          form.errors.password}
                          </COLErrorMessage>
                      </>
                    )}
                  />

                  <COLPrimaryButton
                    type='submit'
                    fullWidth={false}
                    style={{margin: 'auto', display: 'block'}}
                  >
                  Log in
                  </COLPrimaryButton>

                </Form>
              )}
            />

          </DialogContent>

        </Dialog>
      </div>
    );
  }
}

// export default withMobileDialog()(LoginModal);
export default withStyles(styles)(withMobileDialog()(LoginModal));
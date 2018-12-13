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

const styles = (theme: any) => createStyles({
  root: {
    padding: '40px',
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
          <DialogTitle id="responsive-dialog-title">{"Log in"}</DialogTitle>
          <DialogContent>
            <COLTextField
              name="email"
              label="Your Email"
              fullWidth={true}
              // className={classes.textField}
              value={authStore.loginFields.email}
              onChange={(e) => this.handleChange(e)}
              // margin="normal"
            />
            <COLTextField
              name="password"
              label="Password"
              type='password'
              fullWidth={true}
              onChange={(e) => this.handleChange(e)}
            />

            <COLPrimaryButton
              onClick={() => authStore.login()}
            >
            Log in
            </COLPrimaryButton>

            {/* <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText> */}
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
    );
  }
}

// export default withMobileDialog()(LoginModal);
export default withStyles(styles)(withMobileDialog()(LoginModal));
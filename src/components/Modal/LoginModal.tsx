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

interface Props {
    fullScreen?: boolean
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

  render() {
    const { fullScreen } = this.props;

    const { rootStore } = this.injected;
    const { authStore } = rootStore;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={authStore.showLoginModal}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(LoginModal);

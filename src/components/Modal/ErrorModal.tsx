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
import { createStyles, withStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '../Typography/Typography';

const styles = (theme: any) => createStyles({
    root: {
        padding: '40px',
    },
    paper: {
        minWidth: '300px'
    },
    dialogRoot: {
        padding: '16px'
    }
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
class ErrorModal extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    handleClose = () => {
        const { rootStore } = this.injected;
        const { errorStore } = rootStore;
        errorStore.hideDialog();
    };

    render() {

        const { rootStore } = this.injected;
        const { errorStore } = rootStore;
        const { fullScreen } = this.props;
        const { errorTitle, errorMessage } = errorStore;
        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={errorStore.showError}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    classes={{
                        paper: classes.paper,
                    }}
                >
                    <DialogTitle
                        id="responsive-dialog-title"
                        disableTypography
                        classes={{
                            root: classes.dialogRoot
                        }}
                        style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}
                    >
                        <Typography variant='h6'>{errorTitle}</Typography>
                        <IconButton onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent
                        classes={{
                            root: classes.dialogRoot
                        }}
                    >
                        <DialogContentText>
                            {errorMessage}
                        </DialogContentText>
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

export default withStyles(styles)(withMobileDialog({ breakpoint: 'xs' })(ErrorModal));
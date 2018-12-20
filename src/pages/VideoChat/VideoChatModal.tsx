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
import Typography from '../../components/Typography/Typography';
import VideoChatPlayer from './VideoChatPlayer';

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
class VideoChatModal extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    handleClose = () => {
        const { rootStore } = this.injected;
        const { videoChatStore } = rootStore;
        videoChatStore.clearVideoChat();
    };

    render() {

        const { rootStore } = this.injected;
        const { videoChatStore, errorStore } = rootStore;
        const { fullScreen } = this.props;
        const { errorTitle, errorMessage } = errorStore;
        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={videoChatStore.showVideoChat}
                    onClose={this.handleClose}
                    disableBackdropClick
                    aria-labelledby="responsive-dialog-title"
                    classes={{
                        paper: classes.paper,
                    }}
                >
                    <DialogContent
                        classes={{
                            root: classes.dialogRoot
                        }}
                    >
                        <VideoChatPlayer/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(withMobileDialog({ breakpoint: 'xs' })(VideoChatModal));
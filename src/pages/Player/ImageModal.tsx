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
import { downloadUrlForMedia } from '../../models/MediaModel';

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
class ImageModal extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    handleClose = () => {
        const { rootStore } = this.injected;
        const { playerStore } = rootStore;
        playerStore.clearMedia();

    };

    render() {

        const { rootStore } = this.injected;
        const { authStore, playerStore } = rootStore;
        const { media } = playerStore;
        const { fullScreen } = this.props;
        const { classes } = this.props;

        return (
            <div>
                {media &&
                    <Dialog
                        fullScreen={fullScreen}
                        open={true}
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
                            <Typography variant='h6'>{media.name}</Typography>
                        </DialogTitle>
                        <DialogContent
                            classes={{
                                root: classes.dialogRoot
                            }}
                        >
                            <DialogContentText>
                                <img src={downloadUrlForMedia(media)} width='100%'/>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                }
            </div>
        );
    }
}

export default withStyles(styles)(withMobileDialog({ breakpoint: 'xs' })(ImageModal));
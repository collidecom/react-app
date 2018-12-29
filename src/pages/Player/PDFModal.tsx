import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import { createStyles, withStyles, IconButton } from '@material-ui/core';
import Typography from '../../components/Typography/Typography';
import { downloadUrlForMedia } from '../../models/MediaModel';
import { Document, Page, pdfjs } from 'react-pdf';
import LazyLoad from 'react-lazyload';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.js`;

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

interface State {
    numPages?: number;
    pageNumber: number;
}

@inject('rootStore')
@observer
class PDFModal extends React.Component<Props, State> {

    state = {
        numPages: undefined,
        pageNumber: 1,
    }

    onDocumentLoadSuccess = (e: any) => {
        this.setState({
            numPages: e.numPages
        });
      }

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
        const { pageNumber, numPages } = this.state;

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
                                {/* <img src={downloadUrlForMedia(media)} width='100%'/> */}
                                <Document
                                    // file={downloadUrlForMedia(media)!}
                                    file={require('../../samplepdf.pdf')}
                                    onLoadSuccess={this.onDocumentLoadSuccess}
                                    >
                                    {Array.from({length: this.state.numPages || 0}, (item, index) =>
                                        <Page pageNumber={index} />
                                    )}
                                </Document>
                                <p>Page {pageNumber} of {numPages}</p>
                                <button onClick={() => this.setState({
                                    pageNumber: pageNumber+1
                                })}>next</button>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                }
            </div>
        );
    }
}

export default withStyles(styles)(withMobileDialog({ breakpoint: 'xs' })(PDFModal));
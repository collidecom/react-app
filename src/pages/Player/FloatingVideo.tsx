import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import ReactPlayer from 'react-player';
import { downloadUrlForMedia } from '../../models/MediaModel';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface Props {

}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class FloatingVideo extends React.Component<Props> {

    state = {
        showClose: false
    }

    get injected() {
        return this.props as InjectedProps;
    }

    render() {

        const { rootStore } = this.injected;
        const { authStore, playerStore } = rootStore;
        const { media } = playerStore;

        const aspectRatio = playerStore.mediaWidth / playerStore.mediaHeight;
        const width = Math.min(playerStore.mediaWidth, 400);
        const height = width / aspectRatio;
        return (
            <div
                className='player-wrapper'
                onMouseEnter={() => this.setState({showClose: true})}
                onMouseLeave={() => this.setState({showClose: false})}
            >
                <ReactPlayer
                url={media ? downloadUrlForMedia(media) : ''}
                // className='react-player'
                playing
                controls
                width={width}
                height={height}
                />
                {this.state.showClose &&
                    <IconButton
                        className='video-close-button'
                        onClick={() => playerStore.clearMedia()}
                    >
                        <CloseIcon style={{color: 'white'}}/>
                    </IconButton>
                }

            </div>
        );
    }
}
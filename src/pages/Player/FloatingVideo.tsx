import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import ReactPlayer from 'react-player';
import { downloadUrlForMedia } from '../../models/MediaModel';

interface Props {

}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class FloatingVideo extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    render() {

        const { rootStore } = this.injected;
        const { authStore, playerStore } = rootStore;
        const { media } = playerStore;
        return (
            <div className='player-wrapper'>
                <ReactPlayer
                url={media ? downloadUrlForMedia(media) : ''}
                className='react-player'
                playing
                width='100%'
                height='100%'
                />
            </div>
        );
    }
}
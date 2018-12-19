import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import ReactPlayer from 'react-player';
import { streamableAudioForMedia } from '../../models/MediaModel';

interface Props {

}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class FloatingAudio extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    render() {

        const { rootStore } = this.injected;
        const { authStore, playerStore } = rootStore;
        const { media } = playerStore;
        const url = 'http://www.ffmages.com/ffxiii/ost/disc-4/21-kimi-ga-iru-kara-long-version.mp3';
        return (
            <div className='audio-wrapper'>
                <ReactPlayer
                url={media ? streamableAudioForMedia(media) : url}
                playing
                controls
                width='100%'
                height='80px'
                />
            </div>
        );
    }
}
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import ReactPlayer from 'react-player';
import { streamableAudioForMedia } from '../../models/MediaModel';
import Typography from '../../components/Typography/Typography';
import Paper from '../../components/Paper/Paper';

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
            <div>
                {media &&
                    <div className='audio-wrapper'>
                        <Paper>
                            <Typography style={{marginLeft: '32px'}}>
                            Playing {media.name} by {media.star.profile_name}
                            </Typography>
                        </Paper>

                        <ReactPlayer
                            url={streamableAudioForMedia(media)}
                            playing
                            controls
                            width='100%'
                            height='54px'
                        />
                    </div>
                }
            </div>

        );
    }
}
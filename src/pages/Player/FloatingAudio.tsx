import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import ReactPlayer from 'react-player';
import { streamableAudioForMedia, thumbnailForMedia } from '../../models/MediaModel';
import Typography from '../../components/Typography/Typography';
import Paper from '../../components/Paper/Paper';
import FlexContainer from '../../components/Container/FlexContainer';

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

        return (
            <div>
                {media &&
                    <div className='audio-wrapper'>
                        <Paper
                            square={true}
                            style={{backgroundColor: 'lightBlue'}}
                        >
                            <FlexContainer>
                                <img width='30px' height='30px' src={thumbnailForMedia(media)}/>
                                <div style={{marginLeft: '32px'}}>
                                    <Typography>
                                    {media.star.profile_name}
                                    </Typography>
                                    <Typography>
                                    {media.name}
                                    </Typography>
                                </div>
                            </FlexContainer>

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
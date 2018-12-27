import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import ReactPlayer from 'react-player';
import MediaModel, { downloadUrlForMedia } from '../../models/MediaModel';

interface Props {
    media: MediaModel
}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class IntroVideoPlayer extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    render() {

        const { rootStore, media } = this.injected;

        const aspectRatio = media.items[0].width / media.items[0].height;
        const width = Math.min(media.items[0].width, 400);
        const height = width / aspectRatio;
        return (
            <div>
                <ReactPlayer
                url={downloadUrlForMedia(media)}
                controls
                width={width}
                height={height}
                />
            </div>
        );
    }
}
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import ReactPlayer from 'react-player';
import { PlayerType } from '../../stores/PlayerStore';
import FloatingVideo from './FloatingVideo';
import FloatingAudio from './FloatingAudio';

interface Props {

}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class PlayerBar extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    render() {

        const { rootStore } = this.injected;
        const { authStore, playerStore } = rootStore;
        
        return (
            <div>
                {/* <button onClick={() => playerStore.setPlayerType(PlayerType.VIDEO)}>VIDEO</button>
                <button onClick={() => playerStore.setPlayerType(PlayerType.AUDIO)}>AUDIO</button> */}
                {playerStore.playerType === PlayerType.VIDEO &&
                    <FloatingVideo/>
                }
                {playerStore.playerType === PlayerType.AUDIO &&
                    <FloatingAudio/>
                }
            </div>
        );
    }
}
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import ReactPlayer from 'react-player';

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
        const { authStore } = rootStore;

        const url = 'https://www.youtube.com/watch?v=FLpE41lnc5g';
        return (
            <div className='player-wrapper'>
                <ReactPlayer
                url='https://vimeo.com/243556536'
                className='react-player'
                playing
                width='100%'
                height='100%'
                />
            </div>
        );
    }
}
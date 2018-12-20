import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';

interface Props {

}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class Settings extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    render() {

        const { rootStore } = this.injected;
        const { authStore } = rootStore;

        return (
            <div>
                <h1>SETTINGS</h1>
            </div>
        );
    }
}
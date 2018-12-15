import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import HomeSupporter from './HomeSupporter';
import HomeCreator from './HomeCreator';

interface Props {

}
  
interface InjectedProps extends Props {
    rootStore: RootStore
}

@inject('rootStore')
@observer
export default class Home extends React.Component<Props> {

    get injected() {
        return this.props as InjectedProps;
    }

    render() {

        const { rootStore } = this.injected;
        const { authStore } = rootStore;

        return (
            <div>
                {!authStore.isLoadingAccount &&
                    <div>
                        {!authStore.isStar && <HomeSupporter/>}
                        {authStore.isStar && <HomeCreator/>}
                    </div>
                }

            </div>
        );
    }
}
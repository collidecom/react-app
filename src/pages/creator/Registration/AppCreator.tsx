import * as React from 'react';
import '../../../App.css';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import Registration from './Registration';
import RootStore from '../../../stores/RootStore';
import Typography from '../../../components/Typography/Typography';

interface Props {

}

interface InjectedProps extends Props {
    rootStore: RootStore
}
@inject('rootStore')
@observer
class App extends React.Component<Props, {}> {

    get injected() {
        return this.props as InjectedProps;
    }

    componentWillMount() {

        const { rootStore } = this.injected;
        const { navBarStore } = rootStore;
        navBarStore.setShowNavBar(false);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

        const { rootStore } = this.injected;
        const { navBarStore } = rootStore;
        navBarStore.setShowNavBar(true);

    }

    render() {

        // TODO: all the other onboarding pages that display a PROGRESS BAR
        const Main = () => (
            <Switch>
              {/* <Route exact path='/description' component={Home} /> */}

            </Switch>
        );

        return (

            <div>
                <div className="fullContainer">
                    <div className="logoContainer">
                        <div className="collideLogo">
                            <a href="/">
                                <img src='https://assets.collide.com/img/betalogo.svg' height="37px" />
                            </a>
                        </div>
                        <Typography
                            align="right"
                            style={{ fontWeight: 'bold' }}
                        >
                            BE YOU. GET PAID
                        </Typography>
                    </div>
                    <div className='pageContainer'>
                        <Switch>
                            <Route exact={true} path='' component={Registration} />
                        </Switch>
                    </div>
                </div>
            </div>

        );
    }
}

export default App;
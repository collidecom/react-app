import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RootStore from './stores/RootStore';
import { inject, observer } from 'mobx-react';
import LoginModal from './components/Modal/LoginModal';
import { Switch, Route } from 'react-router';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Home from './pages/Home/Home';
import LandingPage from './pages/Home/LandingPage';
import { MuiThemeProvider } from '@material-ui/core';
import { lightTheme } from './util/theme';
import PlayerBar from './pages/Player/PlayerBar';

interface Props extends RouteComponentProps<{}> {

}

interface InjectedProps extends Props {
  rootStore: RootStore
}
@inject('rootStore')
@observer
class App extends Component<Props> {

  get injected() {
    return this.props as InjectedProps;
  }

  componentDidMount() {

    const { rootStore } = this.injected;
    rootStore.authStore.getAccount();

  }

  render() {
    return (
      <div>
          <MuiThemeProvider theme={lightTheme}>
            <NavBar/>
            <div style={{marginTop: '32px'}}>
              <Switch>
                <Route exact={true} path='/' component={LandingPage} />
                <Route exact={true} path='/app' component={Home} />
              </Switch>
            </div>
            <LoginModal/>
            <PlayerBar/>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
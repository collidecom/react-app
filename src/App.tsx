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
import ErrorModal from './components/Modal/ErrorModal';
import VideoChatModal from './pages/VideoChat/VideoChatModal';
import Registration from './pages/creator/Registration/Registration';
import AppCreator from './pages/creator/Registration/AppCreator';
import CreatorProfile from './pages/Profile/CreatorProfile';
import 'reflect-metadata'; // https://github.com/typestack/class-transformer

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

  /**
   * Find a better solution to update app based on login/logout (location.reload technically works). This works for now.
   */
  authStateListener(didUpdateAuth: boolean) {

    return (
      <MuiThemeProvider theme={lightTheme}>
            <NavBar/>
            <div style={{marginTop: '32px'}}>
              <Switch>
                <Route exact={true} path='/app' component={Home} />
                <Route path='/creator/onboard/signup' component={AppCreator} /> 
                <Route path='/' component={CreatorProfile} />

              </Switch>
            </div>
            <LoginModal/>
            <ErrorModal/>
            <PlayerBar/>
            <VideoChatModal/>
        </MuiThemeProvider>
    );
    
  }

  render() {

    const { rootStore } = this.injected;
    const { authStore } = rootStore;
    const isLoggedIn = authStore.isLoggedIn;

    return (
      <div>
          {this.authStateListener(isLoggedIn)}
      </div>
    );
  }
}

export default withRouter(App);
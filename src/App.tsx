import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RootStore from './stores/RootStore';
import { inject, observer } from 'mobx-react';
import Modal from './components/Modal/LoginModal';
import { Switch, Route } from 'react-router';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Home from './pages/Home/Home';

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
      <div className="App">
        <NavBar/>
          <Switch>
            <Route exact={true} path='/' component={Home} />
          </Switch>
        <Modal/>
      </div>
    );
  }
}

export default withRouter(App);
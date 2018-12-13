import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RootStore from './stores/RootStore';
import { inject, observer } from 'mobx-react';
import Modal from './components/Modal/LoginModal';

interface Props {

}

interface InjectedProps {
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
        <Modal/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RootStore from './stores/RootStore';
import { inject, observer } from 'mobx-react';

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
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
      </div>
    );
  }
}

export default App;

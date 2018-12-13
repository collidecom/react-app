import { RouterStore } from 'mobx-react-router';
import AuthStore from './AuthStore';
import { action } from 'mobx';

export default class RootStore {

    routerStore: RouterStore;
    authStore: AuthStore;

    constructor() {

        this.routerStore = new RouterStore();
        this.authStore = new AuthStore(this);

    }

    @action goHome = () => {

        if (this.authStore.isLoggedIn) {
            window.location.assign('/app');
        }
        else {
            window.location.assign('/');
        }
    }
}

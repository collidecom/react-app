import { RouterStore } from 'mobx-react-router';
import AuthStore from './AuthStore';
import { action } from 'mobx';
import HomeSupporterStore from '../pages/Home/HomeSupporterStore';

export default class RootStore {

    routerStore: RouterStore;
    authStore: AuthStore;
    homeSupporterStore: HomeSupporterStore;

    constructor() {

        this.routerStore = new RouterStore();
        this.authStore = new AuthStore(this);
        this.homeSupporterStore = new HomeSupporterStore(this);

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

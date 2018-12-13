import { RouterStore } from 'mobx-react-router';
import AuthStore from './AuthStore';

export default class RootStore {

    routerStore: RouterStore;
    authStore: AuthStore;

    constructor() {

        this.routerStore = new RouterStore();
        this.authStore = new AuthStore(this);

    }
}

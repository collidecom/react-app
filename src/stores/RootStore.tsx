import { RouterStore } from 'mobx-react-router';

export default class RootStore {

    routerStore: RouterStore;

    constructor() {

        this.routerStore = new RouterStore();

    }
}

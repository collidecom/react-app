import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';

export enum LoginModalTab {
    SIGNUP,
    LOGIN
}
export default class LoginModalStore {

    rootStore: RootStore;

    @observable selectedTab: LoginModalTab = LoginModalTab.LOGIN;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }


    @action setSelectedTab = (selectedTab: LoginModalTab) => {
        this.selectedTab = selectedTab;
    }
}

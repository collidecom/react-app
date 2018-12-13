import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';

export default class AuthStore {

    rootStore: RootStore;

    @observable user: any = {};
    @observable showLoginModal = false;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action getAccount = () => {
        ApiClient.get('account').then((response) => {
            this.user = response.data.account;
        }).catch((error) => {
            // not logged in, redirect to / ?
        });
    }

    @action logout = () => {
        ApiClient.get('logout').then((response) => {
            this.user = null;
        }).catch((error) => {

        });
    }

    @computed get isLoggedIn(): boolean {
        return this.user && this.user.id > 0; 
    }

    @computed get isStar():boolean {

        return this.user && this.user.account_type === "STAR";
    }

    @action setShowLoginModal = (show: boolean) => {
        this.showLoginModal = show;
    }
}

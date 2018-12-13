import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';

export default class AuthStore {

    rootStore: RootStore;

    @observable user: any = {};
    @observable showLoginModal = false;
    
    @observable loginFields: any = {
        email: '',
        password: '',
    }

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

    @action login = () => {

        ApiClient.get('login', {
            email: this.loginFields.email,
            password: this.loginFields.password
        }).then(() => {
            this.setShowLoginModal(false);
            this.getAccount();
        }).catch(() => {

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

    @action setLoginField = (name: string, value: string) => {

        this.loginFields[name] = value;
    }
}

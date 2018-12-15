import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import UserModel, { AccountType } from '../models/UserModel';
import { convertCreditsToDollars } from '../util/Credits';

export default class AuthStore {

    rootStore: RootStore;

    @observable isLoadingAccount = false;
    @observable user?: UserModel = undefined; 
    @observable showLoginModal = false;
    
    @observable loginFields: any = {
        email: '',
        password: '',
    }

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action getAccount = () => {
        this.isLoadingAccount = true;
        ApiClient.get('account').then((response) => {
            this.user = response.data.account;
            this.isLoadingAccount = false;
        }).catch((error) => {
            // not logged in, redirect to / ?
            this.isLoadingAccount = false;
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
            this.user = undefined;
        }).catch((error) => {

        });
    }

    @computed get isLoggedIn(): boolean {
        if (this.user && this.user.id > 0) {
            return true;
        }
        return false;
    }

    @computed get isStar():boolean {

        return this.isLoggedIn && this.user!.account_type === AccountType.STAR;        
    }

    @computed get userId():number {
        if (this.user) {
            return this.user.id;
        }
        return 0;
    }

    @action credits(): string {
        if (this.user) {
            return convertCreditsToDollars(this.user.credits);
        }
        return '';
    }

    @action setShowLoginModal = (show: boolean) => {
        this.showLoginModal = show;
    }

    @action setLoginField = (name: string, value: string) => {

        this.loginFields[name] = value;
    }
}

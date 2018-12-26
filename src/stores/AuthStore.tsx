import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import UserModel, { AccountType } from '../models/UserModel';
import { convertCreditsToDollars } from '../util/Credits';
import { LoginFormValues } from '../components/Modal/LoginModal';

export default class AuthStore {

    rootStore: RootStore;

    @observable isLoadingAccount = false;
    @observable user?: UserModel = undefined; 
    @observable showLoginModal = false;

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

    @action login = (values: LoginFormValues) => {

        const { email, password } = values;

        ApiClient.get('login', {
            email: email,
            password: password,
        }).then(() => {
            this.setShowLoginModal(false);
            this.getAccount();
        }).catch((error) => {
            this.rootStore.errorStore.setErrorMessage(error);
        });
    }

    @action logout = () => {
        ApiClient.get('logout').then((response) => {
            this.user = undefined;
        }).catch((error) => {
            this.rootStore.errorStore.setErrorMessage(error);
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

}

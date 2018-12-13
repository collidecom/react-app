import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action } from 'mobx';

export default class AuthStore {

    rootStore: RootStore;

    @observable user: any = {};
    
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
}

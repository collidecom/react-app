import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import throwError from '../util/ThrowError';
import AvailableChatModel from '../models/AvailableChatModel';

export default class VideoChatStore {

    rootStore: RootStore;
    @observable showVideoChat = false;

    @observable availableChat?: AvailableChatModel = undefined;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action clearVideoChat = () => {
        this.availableChat = undefined;
        this.showVideoChat = false;
    }
}

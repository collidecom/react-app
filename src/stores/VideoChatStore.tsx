import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import throwError from '../util/ThrowError';
import VideoChatModel from '../models/VideoChatModel';
import StarModel from '../models/StarModel';

export default class VideoChatStore {

    rootStore: RootStore;
    @observable showVideoChat = false;
    @observable star?: StarModel = undefined;
    @observable otherDisplayName?: string = undefined;

    @observable videoChat?: VideoChatModel = undefined;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action initializeVideoChat(chat: VideoChatModel, star: StarModel, otherDisplayName: string) {
        this.videoChat = chat;
        this.star = star;
        this.otherDisplayName = otherDisplayName;
        this.showVideoChat = true;
    }
    
    @action clearVideoChat = () => {
        this.videoChat = undefined;
        this.showVideoChat = false;
    }
}

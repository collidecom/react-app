import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import MediaModel from '../models/MediaModel';
import { PostType } from '../models/PostModel';

export enum PlayerType {
    NONE,
    VIDEO,
    AUDIO
}

export default class PlayerStore {

    rootStore: RootStore;
    @observable media?: MediaModel = undefined;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action setMedia = (media: MediaModel) => {
        // should I check if the existing is the same? if so, do not set?
        this.media = media
    }

    @computed get playerType(): PlayerType {

        let playerType = PlayerType.NONE;

        if (this.media) {
            switch (this.media.type) {
                case PostType.VIDEO:
                    playerType = PlayerType.VIDEO;
                    break;
                case PostType.AUDIO:
                    playerType = PlayerType.AUDIO;
                    break;
                default:
                    playerType = PlayerType.NONE;
            }
        }

        return playerType;
    }
}

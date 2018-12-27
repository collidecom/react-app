import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import MediaModel from '../models/MediaModel';

export default class MediaStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action getMedia(mediaId: number) {
        ApiClient.get(`media/${mediaId}`).then((response) => {
            this.rootStore.playerStore.setMedia(response);
        }).catch((error) => {
            this.rootStore.errorStore.setErrorMessage(error);
        });
    }
}

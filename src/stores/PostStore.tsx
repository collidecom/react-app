import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';

export default class PostStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action likePost = (postId: number) => {

        console.log(postId);
    }

}

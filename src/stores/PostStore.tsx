import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import PostModel from '../models/PostModel';

export default class PostStore {

    rootStore: RootStore;
    @observable isLiking = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action likePost = (post: PostModel): Promise<any> => {

        const postId = post.post_id;
        const like = !post.post_is_liked;

        this.isLiking = true;
        if (like) {
            return ApiClient.get(`post/${postId}/like`).then(() => {
                post.post_is_liked = true;
                this.isLiking = false;
            }).catch(() => {
                this.isLiking = false;
            });
        }
        else {
            return ApiClient.get(`post/${postId}/unlike`).then(() => {
                post.post_is_liked = false;
                this.isLiking = false;
            }).catch(() => {
                this.isLiking = false;
            });;
        }

    }

}

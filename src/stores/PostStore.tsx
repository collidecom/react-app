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

    @action likePost = async (post: PostModel): Promise<any> => {

        const postId = post.post_id;
        const like = !post.post_is_liked;

        this.isLiking = true;

        let route;
        if (like) {
            route = 'like';
        }
        else {
            route = 'unlike';
        }

        try {
            const response = await ApiClient.get(`post/${postId}/${route}`);
            post.post_is_liked = like;
            post.post_likes = response.data.likes;
            this.isLiking = false;
        }
        catch (e) {
            this.isLiking = false;
        }

    }

}

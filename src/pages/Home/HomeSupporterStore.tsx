
import RootStore from '../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../util/ApiClient';
import PostModel, { filterUnprocessedPosts } from '../../models/PostModel';

export default class HomeSupporterStore {

    rootStore: RootStore;
    
    @observable isFetching = false;
    @observable postsArray: PostModel[] = [];
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action fetchInitialPosts = () => {

        const params = {
            web: 1,
            offset: 0,
            limit: 5   // TODO: get however many user previously fetched?
        };
    
        ApiClient.get('feed/posts', params).then((response) => {
            const fetchedArray = response.data.favorites_posts;
            const filteredArray = filterUnprocessedPosts(fetchedArray);
            this.postsArray = filteredArray;

        }).catch((error) => {
            console.log(error);
        });

    }

    @action fetchPosts = () => {

        this.isFetching = true;
        const params = {
            web: 1,
            offset: this.postsArray.length,
            limit: 10
        };
    
        ApiClient.get('feed/posts', params).then((response) => {
            const fetchedArray = response.data.favorites_posts;
            this.postsArray = this.postsArray.slice().concat(fetchedArray);
            this.isFetching = false;

        }).catch((error) => {
            console.log(error);
            this.isFetching = true;
        });
    }

}

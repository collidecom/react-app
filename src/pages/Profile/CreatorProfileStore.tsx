
import RootStore from '../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../util/ApiClient';
import PostModel, { filterUnprocessedPosts } from '../../models/PostModel';
import StarModel from '../../models/StarModel';

export default class ProfileStore {

    rootStore: RootStore;
    
    @observable star?: StarModel = undefined;
    @observable isFetching = false;
    @observable postsArray: PostModel[] = [];
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action getStar = (path: string) => {

        // TODO: check if number or string. If string, make search api call to see if creator exists.
        ApiClient.get(`star/${path}?department=NONE`).then((response) => {
            if (response.data && response.data.star) {
                this.star = response.data.star;
                this.fetchInitialPosts();
            }
        }).catch((error) => {
            this.rootStore.errorStore.setErrorMessage(error);
        })

    }
    
    @action fetchInitialPosts = () => {

        if (this.star) {
            const params = {
                web: 1,
                offset: 0,
                limit: 5   // TODO: get however many user previously fetched?
            };
        
            const starId = this.star.id;
            ApiClient.get(`star/${starId}/posts`, params).then((response) => {
                const fetchedArray = response.data;
                const filteredArray = filterUnprocessedPosts(fetchedArray);
                this.postsArray = filteredArray;
    
            }).catch((error) => {
                this.rootStore.errorStore.setErrorMessage(error);
            });
    
        }

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

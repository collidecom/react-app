
import RootStore from '../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../util/ApiClient';
import PostModel from '../../models/PostModel';
import StarModel from '../../models/StarModel';

export default class HomeCreatorStore {

    rootStore: RootStore;
    
    @observable isFetching = false;
    @observable star?: StarModel = undefined;
    @observable postsArray: PostModel[] = [];
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action fetchStar = async() => {
        const starId = this.rootStore.authStore.userId;
        if (!starId) {
            throw('invalid starId');
        }
        return ApiClient.get(`star/${starId}`).then((response) => {
            this.star = response.data.star;
        }).catch((error) => {
            console.log(error);
        });
    }

    @action fetchInitialPosts = () => {

        const params = {
            web: 1,
            offset: 0,
            limit: 5   // TODO: get however many user previously fetched?
        };
    
        const starId = this.rootStore.authStore.userId;
        if (!starId) {
            throw('invalid starId');
        }
        ApiClient.get(`star/${starId}/posts`, params).then((response) => {
            const fetchedArray = response.data;
            this.postsArray = fetchedArray;

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
    
        const starId = this.rootStore.authStore.userId;
        if (!starId) {
            throw('invalid starId');
        }
        ApiClient.get(`star/${starId}/posts`, params).then((response) => {
            const fetchedArray = response.data;
            this.postsArray = this.postsArray.slice().concat(fetchedArray);
            this.isFetching = false;

        }).catch((error) => {
            console.log(error);
            this.isFetching = true;
        });
    }

}

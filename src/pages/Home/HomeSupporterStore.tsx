
import RootStore from '../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../util/ApiClient';

export default class HomeSupporterStore {

    rootStore: RootStore;
    
    @observable postsArray = [];
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action fetchPosts = (limit?: number) => {

        const params = {
            web: 1,
            offset: 0,
            limit: 5
        };
    
        ApiClient.get('feed/posts', params).then((response) => {
            const fetchedArray = response.data.favorites_posts;
            this.postsArray = this.postsArray.slice().concat(fetchedArray);

        }).catch((error) => {
            console.log(error);
        });
    }

}

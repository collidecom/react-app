
import RootStore from '../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../util/ApiClient';
import PostModel, { filterUnprocessedPosts } from '../../models/PostModel';
import StarModel from '../../models/StarModel';

export enum CreatorProfileTab {
    INFO,
    POSTS,
    LIBRARY,
    CONNECT
}
export default class ProfileStore {

    rootStore: RootStore;
    
    @observable star?: StarModel = undefined;
    @observable isFetching = false;
    @observable postsArray: PostModel[] = [];
    @observable selectedTab: CreatorProfileTab = CreatorProfileTab.INFO;

    // prevent multiple follow/unfollow clicks
    @observable isAttemptingFollow = false;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action setSelectedTab = (selectedTab: CreatorProfileTab) => {
        this.selectedTab = selectedTab;
    }

    @action getStar = (path: string) => {
        // TODO: check if number or string. If string, make search api call to see if creator exists.

        const starPromise = ApiClient.get(`star/${path}?department=NONE&count_department=LIBRARY`);
        const starMePromise = ApiClient.get(`star/${path}/me`);

        Promise.all([starPromise, starMePromise]).then(([starResponse, starMeResponse]) => {

            if (starResponse.data && starResponse.data.star) {
                const mergedStar = Object.assign(starResponse.data.star, starMeResponse.data.star);
                this.star = mergedStar;
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

    @action follow = (star: StarModel) => {

        if (this.isAttemptingFollow) {
            return;
        }

        this.isAttemptingFollow = true;

        const follow = !star.is_favorite;

        let route;
        if (follow) {
            route = 'add';
        }
        else {
            route = 'remove';
        }

        ApiClient.get(`favorite/${route}/${star.id}`).then(() => {
            star.is_favorite = follow;
            // TODO: update follower count?
            this.isAttemptingFollow = false;

        }).catch((error) => {
            this.rootStore.errorStore.setErrorMessage(error);
            this.isAttemptingFollow = false;
        });
    }
}

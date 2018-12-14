import RootStore from './RootStore';
import { observable, action, computed } from 'mobx';
import StarModel from '../models/StarModel';
import PostModel, { PostAccess } from '../models/PostModel';
import MediaModel from '../models/MediaModel';
import { AccountType } from '../models/UserModel';

export default class AccessStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action accessMedia(star: StarModel, post?: PostModel, media?: MediaModel): boolean {

        const authStore = this.rootStore.authStore;

        // Non logged in users will not be able to see ANYTHING
        if (!authStore.isLoggedIn) {
            return false;
        }

        // Creator viewing on post.
        if (authStore.userId === star.id) {
            return true;
        }

        if (post) {
            // Public posts are accessible
            if (post.post_access === PostAccess.PUBLIC) {
                return true;
            }
            // Subscribed users, purchasers this should be able to view this.
            if (post.post_this_user_access) {

                if (post.post_this_user_access.includes(PostAccess.SUBSCRIBED) || post.post_this_user_access.includes(PostAccess.PURCHASED)) {
                    return true
                }
            }
            
        }

        if (media) {

            // Allow free videos
            if (media.credits_price === 0) {
                return true;
            }
            // Allow premium subscribers to view media
            if (star && star.subscription && star.subscription.type === 'MEDIA') {
                return true;
            }
            if (media.purchased) {
                return true;
            }
            if (star.library_purchased) {

                for (let i = 0; i < star.library_purchased.length; i++) {

                    const library: any = star.library_purchased[i];
                    if (library.id == media.id) {
                        return library.purchased;
                    }
                }
            }
        }

        return false;
    }

}

import { RouterStore } from 'mobx-react-router';
import { action } from 'mobx';
import AuthStore from './AuthStore';
import HomeSupporterStore from '../pages/Home/HomeSupporterStore';
import AccessStore from './AccessStore';
import PostStore from './PostStore';
import HomeCreatorStore from '../pages/Home/HomeCreatorStore';
import PlayerStore from './PlayerStore';
import MediaStore from './MediaStore';

export default class RootStore {

    routerStore: RouterStore;
    authStore: AuthStore;
    homeSupporterStore: HomeSupporterStore;
    homeCreatorStore: HomeCreatorStore;
    accessStore: AccessStore;
    postStore: PostStore;
    playerStore: PlayerStore;
    mediaStore: MediaStore;

    constructor() {

        this.routerStore = new RouterStore();
        this.authStore = new AuthStore(this);
        this.homeSupporterStore = new HomeSupporterStore(this);
        this.homeCreatorStore = new HomeCreatorStore(this);
        this.accessStore = new AccessStore(this);
        this.postStore = new PostStore(this);
        this.playerStore = new PlayerStore(this);
        this.mediaStore = new MediaStore(this);

    }

    @action goHome = () => {

        if (this.authStore.isLoggedIn) {
            this.routerStore.push('/app');
        }
        else {
            this.routerStore.push('/');
        }
    }
}

import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import throwError from '../util/ThrowError';
import StarChatRequest from '../models/StarChatRequest';

const INTERVAL = 10000;
export default class VideoChatRequestStore {

    rootStore: RootStore;
    @observable timer?: NodeJS.Timeout = undefined;

    @observable requests: StarChatRequest[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        // TODO: check user auth, then poll
        this.getStarQueue();
        this.timer = setInterval(() => {
            this.getStarQueue();
        }, INTERVAL);
    }

    /**
    * Get Creator's pending chat request queue
    */
    @action getStarQueue = () => {
        ApiClient.get('star/vchat/queue').then((response) => {
            console.log(response);
            this.requests = response.data;
        }).catch((error) => {
            throwError(error);
        });
   }

}

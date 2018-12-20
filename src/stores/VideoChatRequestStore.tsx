import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import throwError from '../util/ThrowError';
import StarChatRequest from '../models/StarChatRequest';

const INTERVAL = 10000;
export default class VideoChatRequestStore {

    rootStore: RootStore;
    @observable timer?: NodeJS.Timeout = undefined;
    @observable isLoadingRequest = false;

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

    /**
     * Creator selects Supporter in request container to Video Chat with
     * Creator can only have one Video Chat session at a time
     */
    @action creatorStartVideoChat(request: StarChatRequest) {
        if (this.isLoadingRequest) {
            return;
        }
        this.isLoadingRequest = true;
        request.isRequesting = true;
        // show loading indicator on specific menu element?? or mid screen
        ApiClient.get('star/vchat/start/' + request.video_chat_request_id).then((response) => {

            const chat = response.data;
            const starId = this.rootStore.authStore.userId;

            ApiClient.get(`star/${starId}`).then((response) => {

                const star = response.data.star;
                // star video chat. (chat, star, otherDisplayName)
                this.isLoadingRequest = false;
                request.isRequesting = false;
            })
            .catch((error) => {
                this.isLoadingRequest = false;
                request.isRequesting = false;
                throwError(error);
            });            
        })
        .catch((error) => {
            if (error === 'creator is currently chatting.') {
                this.rootStore.errorStore.setError('Sorry', 'You can only have one Video Chat at a time.');
            }
            else {
                this.rootStore.errorStore.setErrorMessage(error);
            }
            this.isLoadingRequest = false;
            request.isRequesting = false;
        })

    }


}

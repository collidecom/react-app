import { observable, action, computed } from 'mobx';
import { URLPathModel, URLPATHS } from '../util/URLPaths';
import ApiClient from '../util/ApiClient';

import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import UserResisterModel from '../models/UserRegisterModel';
import Subscription from '../models/SubscriptionModel';

import { AxiosResponse, AxiosError } from 'axios';

const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();

export const history = syncHistoryWithStore(browserHistory, routerStore);
export default class SupporterStore {

    routerStore = routerStore;
    
    @observable user: any = {
        username: '',
        email: '',
        password: '',
        termsAgreed: false,
        ageConsent: false,
        rating: 2,
    };

    @observable id = 0;
    @observable profile_name = '';
    @observable profile_image_url?: string;
    @observable profile_name_url?: string;
    @observable available?: [string];
    @observable donationSubscription?: Subscription;
    @observable premiumSubscription?: Subscription;

    @observable isLoading = true;
    @observable error: string | undefined;

    @observable currentView = URLPATHS.SUPPORTER.page1;
    @observable redirectURL = 'app';

    @action setCurrentView = (stepModel: URLPathModel) => {
        this.currentView = stepModel;
    }

    @action clearError() {
        this.error = undefined;
    }

    @action push = (stepModel: URLPathModel) => {
        this.currentView = stepModel;
        routerStore.push(stepModel.path);
    }

    @action updateUser = (key: string, value: string) => {
        this.user[key] = value;
    }

    @action updateUserChecked = (key: string, checked: boolean) => {
        if (key === 'rating') {
            // checked means creator is uploading appropriate content.
            if (checked) {
                this.user.rating = 2;   // PG
            }
            else {
                this.user.rating = 1;   // R
            }
        }
        else {
            this.user[key] = checked;
        }
    }

    @action setRedirectURL(url: string) {
        this.redirectURL = url;
    }

    @computed get isDeepLink() {
        if (this.currentView.path.includes('link')) {
            return true;
        }
        return false;
    }

    @computed get numberOfSteps(): number {
        if (this.profile_name) {
            if (this.available && this.available.length > 0 && this.available[0] === 'NONE') {
                return 2;
            }
            else {
                return 3;
            }
        }
        else {
            return 5;
        }
    }

    @computed get showStepper() {

        if (this.profile_name) {
            if (this.currentView.progressStep < 3) {
                return true;
            }
        }
        else {
            if (this.currentView.progressStep < 6) {
                return true;
            }
        }
        return false;
    }

    @action getStar(starId: string) {

        var self = this;

        ApiClient.get(`star/${starId}`).then((response: AxiosResponse) => {

            if (response.data && response.data.data && response.data.data.star) {
                const star = response.data.data.star;

                self.id = star.id;
                self.profile_name = star.profile_name;
                self.profile_image_url = star.profile_image;
                self.profile_name_url = (star.profile_name_url).replace(/\//g, '');
                self.available = star.available;

                star.subscriptions.forEach((sub: Subscription) => {
                    sub.dollarPrice = '$' + (sub.credits_price / 100).toFixed(2);
                    if (sub.type === 'PATRON') {
                        self.donationSubscription = sub;
                    }
                    else {
                        self.premiumSubscription = sub;
                    }
                });

                self.push(URLPATHS.SUPPORTER.link1);
                
            }

            self.isLoading = false;

        }).catch((error: AxiosError) => {
            self.isLoading = false;
        });
        
    }

}

import { observable, action, computed } from 'mobx';
import { URLPathModel, URLPATHS } from '../util/URLPaths';
import ApiClient from '../util/ApiClient';

import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

// import DescriptionStore from '../pages/creator/Description/DescriptionStore';
// import ServicesStore from '../pages/creator/Services/ServicesStore';
// import { RatesStore } from '../pages/creator/Rates/RatesStore';
// import SocialShareStore from '../pages/creator/SocialShare/SocialShareStore';
// import BankStore from '../pages/creator/BankInfo/BankStore';

import { AxiosResponse } from 'axios';

const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();

export const history = syncHistoryWithStore(browserHistory, routerStore);

interface User {

    username: string;
    email: string;
    password: string;
    termsAgreed: boolean;
    ageConsent: boolean;
    rating: 0 | 1 | 2; // 0 - not selected. 1 - R. 2 - PG.
    aboutMe: string;
    profileImageURL: string | undefined;
    croppedImageURL: string | undefined;
    profile: string;
    profile_name_url: string;
}

export default class CreatorStore {

    routerStore = routerStore;
    // descriptionStore = DescriptionStore;
    // servicesStore: ServicesStore;
    // ratesStore: RatesStore;
    // socialShareStore: SocialShareStore;
    // bankStore: BankStore;

    @observable user: any = {
        username: '',
        email: '',
        password: '',
        termsAgreed: false,
        ageConsent: false,
        rating: 0,
        aboutMe: '',
        profileImageURL: undefined,
        croppedImageURL: undefined,
        profile: '',
        profile_name_url: '',
    };

    @observable error: string | undefined;

    @observable cropping = false;
    @observable loading = false;

    @observable isLoading = false;
    @observable currentView = URLPATHS.CREATOR.signupA;

    // need to keep track of the below because user is supposed to be shown the second path after they choose one.
    @observable showedShare = false;
    @observable showedVideo = false;

    @observable redirectToApp = false;
    // #172
    @observable onboarding_string: string | undefined;

    constructor() {
        // this.ratesStore = new RatesStore(this);
        // this.servicesStore = new ServicesStore(this);
        // this.socialShareStore = new SocialShareStore(this);
        // this.bankStore = new BankStore(this);
    }

    @action clearError() {
        this.error = undefined;
    }

    @action setCurrentView = (stepModel: URLPathModel) => {
        this.currentView = stepModel;
    }

    @action push = (stepModel: URLPathModel) => {
        if (stepModel.path === URLPATHS.CREATOR.share.path) {
            this.showedShare = true;
        }
        else if (stepModel.path === URLPATHS.CREATOR.uploadVideo.path) {
            this.showedVideo = true;
        }
        routerStore.push(stepModel.path);
    }

    @computed get showProgressBar() {
        return this.isOnboarding;
    }

    @computed get useMargins() {

        if (this.currentView.path === URLPATHS.CREATOR.bank.path) {
            return false;
        }
        return true;
    }

    @computed get isOnboarding() {
        return this.currentView.progressStep < 9;
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
            // if (!this.descriptionStore.appropriateContentHelp.showed) {
            //     this.descriptionStore.showAppropriateContentAlert();
            // }
        }
        else {
            this.user[key] = checked;
        }
    }

    @action updateUserRating = (key: string) => {

        var rating: 0 | 1 | 2;
        if (key === 'hide') {
            rating = 2;
        }
        else {
            rating = 1;
        }
        this.user.rating = rating;
        sessionStorage.setItem('rating', rating.toString());
    }

    @action selectImage = (imageURL: string) => {
        this.user.croppedImageURL = undefined;
        this.user.profileImageURL = undefined;
        this.user.profileImageURL = imageURL;
    }

    @action cropImage = (imageURL: string) => {
        this.user.croppedImageURL = imageURL;
        this.cropping = false;
    }
    
    @action toggleCropping = () => {
        this.cropping = !this.cropping;
    }

    @action setredirectToApp() {
        this.redirectToApp = true;
    }

    @action register() {

        this.loading = true;

        var self = this;

        var params: any = {
            email: this.user.email,
            password: this.user.password,
            username: this.user.username,
            terms_agree: '1',
            gender: 'MALE',
            birth_date: '2000-01-01',
        };

        // Workaround for rating somehow being set to 0
        var rating = this.user.rating;
        if (rating === 0) {
            const storageRatingString = sessionStorage.getItem('rating');
            if (storageRatingString) {
                const storageRatingInt = parseInt(storageRatingString, 0);
                if (storageRatingInt === 0 || storageRatingInt === 1 || storageRatingInt === 2) {
                    rating = storageRatingInt;
                }
            }
    
        }
        else if (rating === 2) {
            // Send up allAges if user does NOT want to see mature content. Send up nothing for mature content
            params.allAges = true;
        }

        ApiClient.post('register_form', params).then(() => {

            ApiClient.get('account').then(() => {
                ApiClient.postWithProgress('user/star_form', {
                                conditions: 'on',
                                profile_name: this.user.username,
                                about_me: this.user.aboutMe,
                                profile_picture_file: this.user.croppedImageURL || this.user.profileImageURL,
                                chat_filter: this.user.rating,
                                onboarding_string: this.onboarding_string
                                }, (callback: any) => {
                                    console.log(callback);
                                }).then((response: AxiosResponse) => {         
                                    if (response.data && response.data.data && response.data.data.profile) {
                                        if (response.data.data.profile) {
                                            
                                            self.user.profile_name_url = response.data.data.profile;
                                            self.user.profile = (response.data.data.profile).replace('/', '');
                                        }
                                    }  
                                    self.cropping = false;
                                    self.loading = false;
                                    self.push(URLPATHS.CREATOR.checkpoint);
                }).catch((error: string) => {
                    self.error = error;
                    self.loading = false;
                });
            });
        })
        .catch((error: string) => {
            self.loading = false;
            self.error = error;
            // this.routerStore.goBack();
        });

    }

}

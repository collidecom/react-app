
import RootStore from '../../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../../util/ApiClient';
import { URLPATHS } from '../../../util/URLPaths';
import { RegisterFormValues } from './Registration';
import { ProfileFormValues } from '../Profile/Profile';

export default class RegistrationStore {

    rootStore: RootStore;

    @observable username = '';
    @observable email = '';
    @observable password = '';
    @observable rating: 0 | 1 | 2 = 0;
    @observable aboutMe = '';

    @observable onboardingString = '';
    @observable profileNameUrl = '';
    @observable profile = '';

    @observable croppedImageURL?: string = undefined;
    @observable profileImageURL?: string = undefined;

    @observable cropping = false;
    @observable loading = false;

    @observable showHelp = {
        age: false,
        description: false,
    };

    @observable appropriateContentHelp = {
        show: false,
        showed: false
    };

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action setValues(values: RegisterFormValues) {

        const { username, email, password, rating } = values;
        const usernamePromise = ApiClient.post('register/validate_username', {
            username: username
        });
        const emailPromise = ApiClient.post('register/validate_email', {
            email: email
        });
        Promise.all([usernamePromise, emailPromise]).then(() => {
            
            this.username = username;
            this.email = email;
            this.password = password;
            this.rating = rating;

            // go to next page?
            this.rootStore.routerStore.push(URLPATHS.CREATOR.profile.path);

        }).catch((error) => {
            this.rootStore.errorStore.setErrorMessage(error);
        });

    }

    @action toggleShowHelp = (name: 'age' | 'description') => {
        this.showHelp[name] = !this.showHelp[name];
    }

    @action showAppropriateContentAlert() {
        this.appropriateContentHelp.show = true;
        this.appropriateContentHelp.showed = true;
    }

    @action hideAppropriateContentAlert() {
        this.appropriateContentHelp.show = false;
    }

    @action selectImage = (imageURL: string) => {
        this.croppedImageURL = undefined;
        this.profileImageURL = undefined;
        this.profileImageURL = imageURL;
    }

    @action cropImage = (imageURL: string) => {
        this.croppedImageURL = imageURL;
        this.cropping = false;
    }
    
    @action toggleCropping = () => {
        this.cropping = !this.cropping;
    }

    @action setredirectToApp() {
        // this.redirectToApp = true;
    }

    @action register = () => {

        let params: any = {
            email: this.email,
            password: this.password,
            username: this.username,
            terms_agree: '1',
            gender: 'MALE',
            birth_date: '2000-01-01',
        };

        if (this.rating === 2) {
            // Send up allAges if user does NOT want to see mature content. Send up nothing for mature content
            params.allAges = true;
        }

        const registerPromise = ApiClient.post('register_form', params);
        const accountPromise = ApiClient.get('account');
        const starFormPromise = ApiClient.postWithProgress('user/star_form', {
            conditions: 'on',
            profile_name: this.username,
            about_me: this.aboutMe,
            profile_picture_file: this.croppedImageURL || this.profileImageURL,
            chat_filter: this.rating,
            onboarding_string: this.onboardingString
        }, () => {

        });

        Promise.all([registerPromise, accountPromise, starFormPromise]).then(([register, account, starForm]) => {
            if (starForm.data && starForm.data.data && starForm.data.data.profile) {                                            
                this.profileNameUrl = starForm.data.data.profile;
                this.profile = (starForm.data.data.profile).replace('/', '');
            }  
            this.cropping = false;
            this.loading = false;
            this.rootStore.routerStore.push(URLPATHS.CREATOR.checkpoint);
        }).catch((error) => {
            this.loading = false;
            this.rootStore.errorStore.setErrorMessage(error);
        });

    }

}

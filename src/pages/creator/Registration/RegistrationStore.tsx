
import RootStore from '../../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../../util/ApiClient';
import { URLPATHS } from '../../../util/URLPaths';

export default class RegistrationStore {

    rootStore: RootStore;

    @observable aboutMe = '';
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

    @action checkDuplicate(username: string, email: string) {

        const usernamePromise = ApiClient.post('register/validate_username', {
            username: username
        });
        const emailPromise = ApiClient.post('register/validate_email', {
            email: email
        });
        Promise.all([usernamePromise, emailPromise]).then(() => {
            
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

}

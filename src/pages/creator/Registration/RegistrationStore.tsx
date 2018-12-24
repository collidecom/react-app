
import RootStore from '../../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../../util/ApiClient';
import { URLPATHS } from '../../../util/URLPaths';

export default class RegistrationStore {

    rootStore: RootStore;
    
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
}

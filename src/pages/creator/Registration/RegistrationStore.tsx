
import RootStore from '../../../stores/RootStore';
import { observable, action } from 'mobx';
import ApiClient from '../../../util/ApiClient';

export default class RegistrationStore {

    rootStore: RootStore;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.checkDuplicate()
    }

    @action checkDuplicate() {

        const usernamePromise = ApiClient.post('register/validate_username', {
            username: 'devsuppovrter'
        });
        const emailPromise = ApiClient.post('register/validate_email', {
            email: 'devsupporter@gmail.com'
        });
        Promise.all([usernamePromise, emailPromise]).then(() => {
            
            // go to next page?

        }).catch((error) => {
            this.rootStore.errorStore.setErrorMessage(error);
        });

    }
}

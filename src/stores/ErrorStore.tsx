import RootStore from './RootStore';
import { observable, action, computed } from 'mobx';

// TODO: add Error enums, for stuff like card declined?
const DEFAULTERRORTITLE = 'Error';
const DEFAULTERRORMESSAGE = 'Something went wrong.';
export default class ErrorStore {

    rootStore: RootStore;

    @observable showError = false;
    @observable errorTitle: string = DEFAULTERRORTITLE;
    @observable errorMessage: string = DEFAULTERRORMESSAGE;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    /**
     * @param {string} title
     * @param {string} message
     */
    @action setError(title: string, message: string) {
        this.errorTitle = title;
        this.errorMessage = message;
        this.showError = true;
    }

    /**
     * Uses DEFAULTERRORTITLE
     * @param {string} message
     */
    @action setErrorMessage(message: string) {
        this.errorTitle = DEFAULTERRORTITLE
        this.errorMessage = message;
        this.showError = true;
    }

    @action hideDialog = () => {
        this.showError = false;
    }

}

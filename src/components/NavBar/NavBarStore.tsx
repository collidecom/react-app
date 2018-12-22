
import RootStore from '../../stores/RootStore';
import { observable, action } from 'mobx';

export default class NavBarStore {

    rootStore: RootStore;

    @observable showNavBar = true;
    @observable showDropdown = false;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action setShowNavBar = (show: boolean) => {
        this.showNavBar = show;
    }
}

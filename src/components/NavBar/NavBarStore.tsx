
import RootStore from '../../stores/RootStore';
import { observable } from 'mobx';

export default class NavBarStore {

    rootStore: RootStore;

    @observable showDropdown = false;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

}

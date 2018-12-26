import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';
import PostModel from '../models/PostModel';
import SupporterStore from './SupporterStore';
import CreatorStore from './CreatorOnboardingStore';

export default class OnboardingStore {

    rootStore: RootStore;

    supporterStore: SupporterStore;
    creatorStore: CreatorStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.supporterStore = new SupporterStore();
        this.creatorStore = new CreatorStore();
    }


}

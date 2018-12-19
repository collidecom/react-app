import RootStore from './RootStore';
import ApiClient from '../util/ApiClient';
import { observable, action, computed } from 'mobx';

export enum PlayerType {
    NONE,
    VIDEO,
    AUDIO
}

export default class PlayerStore {

    rootStore: RootStore;
    @observable playerType: PlayerType = PlayerType.VIDEO;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action setPlayerType = (playerType: PlayerType) => {
        this.playerType = playerType;
    }
}

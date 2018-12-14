import StarModel from "./StarModel";

export enum MediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
}

export default interface MediaModel {

    id: number;
    name: string;
    description: string;
    credits_price: number;
    type: MediaType;
    duration: number;

    purchased: boolean

    likes: number;
    views: number;

    is_liked_by_user: boolean;

    star: StarModel;
    
}
import StarModel from "./StarModel";
import MediaModel from "./MediaModel";

export enum PostType {
    TEXT = 'TEXT',
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
}

export enum PostAccess {
    PUBLIC = 'PUBLIC',
    SUBSCRIBED = 'SUBSCRIBED',
}
export default interface PostModel {

    post_id: number;
    post_text_content: string;
    creator_profile_name: string;
    post_type: PostType;
    post_access: PostAccess;
    post_is_liked: boolean;
    post_likes: number;
    post_media_thumb: string;
    post_raw_date: number;

    star: StarModel;
    post_media_content: MediaModel;

}
import StarModel from "./StarModel";

export enum PostType {
    TEXT = 'TEXT',
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
}
export default interface PostModel {

    post_id: number;
    post_text_content: string;
    creator_profile_name: string;
    post_type: PostType;
    post_is_liked: boolean;
    post_likes: number;
    post_media_thumb: string;
    star: StarModel;

}
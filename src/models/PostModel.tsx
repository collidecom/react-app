import StarModel from "./StarModel";
import MediaModel from "./MediaModel";

export enum PostType {
    TEXT = 'TEXT',
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
    AUDIO = 'AUDIO',
    PDF = 'PDF',
}

export enum PostAccess {
    PUBLIC = 'PUBLIC',
    SUBSCRIBED = 'SUBSCRIBED',
    PURCHASED = 'PURCHASED',
}
export default interface PostModel {

    post_id: number;

    post_headline: string;
    post_text_content: string;

    post_type: PostType;
    post_access: PostAccess;
    post_this_user_access: string;

    post_is_liked: boolean;
    post_likes: number;
    post_media_thumb: string;
    post_raw_date: number;

    star: StarModel;
    creator_profile_name: string;

    post_media_content: MediaModel;

}

export function filterUnprocessedPosts(postsArray: PostModel[]): PostModel[] {
    
    return postsArray.filter((post: PostModel) => {

        if (post.post_media_content) {
            // i'm just listing all indicators that a media is still being processed by the server
            if (post.post_media_thumb.includes('10x10') || !post.post_type) {
                return false;
            }
        }
        return true;
    });
}
import StarModel from "./StarModel";

enum PostType {
    text, video, image
}
export default interface PostModel {

    post_id: number;
    post_text_content: string;
    creator_profile_name: string;
    post_type: PostType;
    star: StarModel;

}
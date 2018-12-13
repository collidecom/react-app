import StarModel from "./StarModel";

export default interface PostModel {

    post_id: number;
    post_text_content: string;
    creator_profile_name: string;
    star: StarModel;
    
}
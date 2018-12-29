import SubscriptionModel from "./SubscriptionModel";
import MediaModel from "./MediaModel";
export default class StarModel {

    id: number;
    profile_name: string;
    profile_name_url: string;
    profile_image: string;
    about: string;

    referral_url: string;

    subscription: SubscriptionModel;

    library_purchased: [];
    featured_vod_data: MediaModel[];

    followers: number;
    is_favorite: boolean;

    media_count: number;

}
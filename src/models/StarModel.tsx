import SubscriptionModel from "./SubscriptionModel";

export default interface StarModel {

    id: number;
    profile_name: string;
    profile_name_url: string;
    profile_image: string;

    subscription: SubscriptionModel;

    library_purchased: [];
    
}
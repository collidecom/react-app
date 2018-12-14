export enum AccountType {
    SUPPORTER = 'USER',
    STAR = 'STAR'
}
export default interface UserModel {

    id: number;
    account_type: AccountType;
    display_name: string;
    profile_name: string;

    credits: number;
    // profile_name_url: string;
    // profile_image: string;
    
}
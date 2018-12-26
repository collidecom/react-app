export default interface UserRegisterModel {

    username: string;
    email: string;
    password: string;
    termsAgreed: boolean;
    ageConsent: boolean;
    rating: 1 | 2; // 1 - R. 2 - PG.
}
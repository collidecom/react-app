export class URLPathModel {

    path: string;
    progressStep: number;

    constructor(path: string, progressStep: number) {
        this.path = path;
        this.progressStep = progressStep;
    }

}

const signupA = new URLPathModel('/', 0);
const profile = new URLPathModel('/profile', 1);
const checkpoint = new URLPathModel('/checkpoint', 2);
const ratesNotice = new URLPathModel('/ratesNotice', 2);
const features = new URLPathModel('/features', 3);
const services = new URLPathModel('/services', 3);
const rates = new URLPathModel('/rates', 4);
const getPaid = new URLPathModel('/getPaid', 5);
const bank = new URLPathModel('/bank', 5);
const finishOnboarding = new URLPathModel('/finishOnboarding', 6);

const share = new URLPathModel('/share', 9);
const uploadVideo = new URLPathModel('/uploadVideo', 9);
const finishShare = new URLPathModel('/finishShare', 10);

const page1 = new URLPathModel('/', 1);
const page2 = new URLPathModel('/2', 2);
const page3 = new URLPathModel('/3', 3);
const page4 = new URLPathModel('/4', 4);
const page5 = new URLPathModel('/5', 5);

const link1 = new URLPathModel('/link1', 1);
const link2 = new URLPathModel('/link2', 2);
const link3 = new URLPathModel('/link3', 3);
const subscriptions = new URLPathModel('/sub', 6);

const creditCard = new URLPathModel('/card', 6);

export const URLPATHS: any = {
    CREATOR: {
        signupA,
        profile,
        checkpoint,
        ratesNotice,
        features,
        services,
        rates,
        getPaid,
        bank,
        finishOnboarding,
        share,
        uploadVideo,
        finishShare
    },
    SUPPORTER: {
        page1,
        page2,
        page3,
        page4,
        page5,
        link1,
        link2,
        link3,
        subscriptions,
        creditCard
    }
};

export function stepModelForPathname(pathname: string): URLPathModel {

    for (var property in URLPATHS) {
        if (URLPATHS.CREATOR.hasOwnProperty(property)) {
            if ('/' + property === pathname) {
                return URLPATHS[property];
            }
        }
    }
    return signupA;

}
let baseURL;
let isTestEnvironment = true;

const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

switch (hostname) {

    case 'www.collide.com':
        baseURL = 'https://www.collide.com/';
        isTestEnvironment = false;
        break;

    case 'stage.collide.com':
        baseURL = 'https://stage.collide.com/';
        break;

    case 'qa.collide.com':
        baseURL = 'https://qa.collide.com/';
        break;

    default:
        baseURL = 'https://dev1.collide.com/';
        break;
}

export const BASEAPI = `${baseURL}api/${apiVersion}/`;
export const BASEURL = baseURL;
export const ISTESTENVIRONMENT = isTestEnvironment;

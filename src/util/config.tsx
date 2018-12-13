let baseURL;
let baseAPI;

if (window.location.hostname === 'localhost') {
    baseURL = 'https://dev1.collide.com/';
    baseAPI = 'https://dev1.collide.com/api/v1/';
}
else {
    baseURL = window.location.protocol + '//' + window.location.hostname + '/';
    baseAPI = '/api/v1/';
}

export const BASEAPI = baseAPI;
export const BASEURL = baseURL;

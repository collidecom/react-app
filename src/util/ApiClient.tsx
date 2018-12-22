import axios, { AxiosResponse, AxiosError } from 'axios';
import { BASEAPI, BASEURL } from './config';
axios.defaults.withCredentials = true;
var base64 = require('base-64');


const headers = {
    'Authorization': `Basic ${base64.encode('')}`
};

var finalURl;

export default class ApiClient {

    static get(controller: string, params?: {}): Promise<any> {
        if (!controller) {
            throw 'Parameter Controller cannot be null';
        }
        
        finalURl = BASEAPI + controller;

        return getRequest(finalURl, params);
    }

    static post(controller: string, params: {}): Promise<any> {
        if (!controller) {
            throw 'Controller cannot be null';
        }
        finalURl = BASEAPI + controller;

        return postRequest(finalURl, params);
    }

    static postWithProgress(controller: string, params: {}, callback: any): Promise<any> {
        if (!controller) {
            throw 'Controller cannot be null';
        }
        finalURl = BASEAPI + controller;

        return postMedia(finalURl, params, callback);
    }

    postBase(controller: string, params: {}): Promise<any> {

        if (!controller) {
            throw 'Controller cannot be null';
        }
        finalURl = BASEURL + controller;

        return postRequest(finalURl, params);
    }

}

function getRequest(url: string, params?: {}): any {
    
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            headers: headers,
            withCredentials: true,
        })
        .then(function (response: AxiosResponse) {
            handleRequestResponse(response).then((data: AxiosResponse) => {
                resolve(data.data);
            })
            .catch((error: string) => {
                reject(error);
            });
        })
        .catch((error: AxiosError) => {
            reject(error.message);
        });
    });
}

function postRequest(url: string, params: {} | null) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,
                   {
                    headers: headers,
                    withCredentials: true
                    })
                    .then((response: AxiosResponse) => {
                        handleRequestResponse(response).then((data: AxiosResponse) => {
                            resolve(data);
                        })
                        .catch((error: string) => {
                            reject(error);
                        });
                    })
                    .catch((error: AxiosError) => {
                        reject(error.message);
                    });
    });
}

function postMedia(url: string, params: any, callback: any) {

    var data = new FormData();

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            if (key === 'profile_picture_file' && params[key]) {
                const profile = dataURItoBlob(params[key]);
                const profileType = profile.type.split('/')[1];
                const profileImageName = `${key.split(' ').join('_')}_profile.${profileType}`;
                data.append('profile_picture_file', profile, profileImageName);
                
            }
            else if (key === 'file' && params[key]) {
                // const videoBlob = dataURItoBlob(params[key]);
                const videoBlob = params[key];
                data.append('file', videoBlob);
            }
            else {
                data.append(key, params[key]);
            }
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(url, data, {
                withCredentials: true,
                headers: headers,
                onUploadProgress: progressEvent => callback((progressEvent.loaded / progressEvent.total) * 100)
            })
            .then((response: AxiosResponse) => {

                handleRequestResponse(response).then((resp: AxiosResponse) => {
                    resolve(resp);
                })
                .catch((error: string) => {
                    reject(error);
                });
            })
            .catch((error: AxiosError) => {
                reject(error.message);
            });
    });
}

function handleRequestResponse(response: AxiosResponse): any {

    return new Promise((resolve, reject) => {

        if (response) {
            if (response.status !== 200) {
                reject(response);
            }
    
            else if (response && response.data && response.data.error) {
                /* 
                    Server gives back errors in 3 formats.
                    1. Error is a string that gives a general error. The actual errors are in an array under -data-.
                    2. Error is a string that gives a general error. The actual errors are in a dictionary under -data-.
                    3. Error is a string that gives the specific error. There are no errors under -data-.
                    4. Error is a dictionary of error strings.
                */
               let errorString = 'Something went wrong.';
               if (typeof response.data.error === 'string') {

                   if (response.data.data) {
                       // Case 1
                       if (Array.isArray(response.data.data)) {
                           errorString = response.data.data[0];
                       }
                       else {
                           // Case 2
                        for (const key in response.data.data) {
                            if (response.data.data.hasOwnProperty(key)) {
                                errorString = response.data.data[key];
                                break;
                            }
                        }
                       }
                   }
                   else {
                       // Case 3.
                       errorString = response.data.error;
                   }
               }
               else {
                   // Case 4
                for (const key in response.data.error) {
                    if (response.data.error.hasOwnProperty(key)) {
                        // show the first error that was return from the server
                        errorString = response.data.error[key];
                        break;
                    }     
                }
               }
               reject(errorString);
            }
            else {
                resolve(response);
            }

        } else {

            reject(response);
            // showCollideErrorAlert('please try again');
        }
    });
    
}

function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
}

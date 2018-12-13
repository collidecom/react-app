import { ISTESTENVIRONMENT } from "./config";

export default function throwError(message?: string) {
    
    if (ISTESTENVIRONMENT) {
        throw(message || 'throwed error');
    }
    else {
        console.log(message || 'throwed error');
    }
    
}
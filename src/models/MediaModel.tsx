import StarModel from "./StarModel";
import { PostType } from "./PostModel";
import throwError from "../util/ThrowError";

export default interface MediaModel {

    id: number;
    name: string;
    description: string;
    credits_price: number;
    type: PostType;
    duration: number;

    purchased: boolean

    likes: number;
    views: number;

    is_liked_by_user: boolean;

    star: StarModel;
    items: [Library];
}

interface Library {

    id: number
    mime: string
    type: PostType
    download_url: string
}

export function downloadUrlForMedia(media: MediaModel) {

    let downloadUrl;

    if (media.items) {
        downloadUrl = media.items[0].download_url;
    }

    if (!downloadUrl) {
        throwError(`no downloadUrl found for mediaId: ${media.id}`);
    }

    return downloadUrl;

}

/**
 * Find the MP3 format to be used when playing through HTML 5 audio.
 * @param {Media} media 
 */
export function streamableAudioForMedia(media: MediaModel) {

    if (media.type !== PostType.AUDIO) {
        throwError(`invalid audio type supplied for streaming audio, ${media.type}`);
    }

    let streamUrl;
    if (media.items) {

        for (let i = 0; i < media.items.length; i++) {
            
            const library = media.items[i];
            if (library.type === PostType.AUDIO) {
                if (library.mime === 'audio/mpeg') {
                    streamUrl = library.download_url;
                    break;
                }
            }
        }

    }

    if (!streamUrl) {
        throwError(`could not find mp3 file for audio: ${media.id}`);
    }

    return streamUrl;

}
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
    thumb: [Thumbnail];

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
    width: number
    height: number
    thumb: [Thumbnail]
    download_url: string
}

interface Thumbnail {
    width: number
    height: number
    url: string
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
 * Depending on the PostType, display the appropriate thumbnail.
 * @param {MediaModel} media 
 * @returns {string} thumbnailUrl
 */
export function thumbnailForMedia(media: MediaModel) {

    let thumbnailUrl;

    if (media.thumb) {
        switch (media.type) {
            case PostType.VIDEO:
            case PostType.IMAGE:
            case PostType.PDF:
                thumbnailUrl = media.thumb[0].url;
                break;
            case PostType.AUDIO:
                // check .items, which may contain an IMAGE.
                if (media.items) {
                    for (let i = 0; i < media.items.length; i++) {
                        const library = media.items[i];
                        if (library.type === PostType.IMAGE) {
                            if (library.thumb) {
                                thumbnailUrl = library.thumb[0].url;
                            }
                            break;
                        }
                    }
                }
                // fallback to basic thumbnail if not supplied
                if (!thumbnailUrl) {
                    thumbnailUrl = media.thumb[0].url;
                }
            break;
            default:
                throwError(`invalid post type ${media.type}`);
        }
    }

    if (!media.thumb) {
        throwError(`no valid media thumb found for media: ${media}`);
    }

    return thumbnailUrl;
}

/**
 * Find the MP3 format to be used when playing through HTML 5 audio.
 * @param {MediaModel} media 
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
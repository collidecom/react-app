import * as React from 'react';
import PostModel, { PostType } from "../../models/PostModel";
import Link from '../Link/Link';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import { media, orangeColor, premiumBlueColor } from '../../util/theme';
import Typography from '../Typography/Typography';
import COLPrimaryButton from '../Button/COLPrimaryButton';
const PlayIcon = require('../../img/icon-play-btn.svg') as string;

interface Props {
    post: PostModel
    access: boolean
}

const LockedMessage = styled.div`

    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), #000000);

    ${media.tablet`
        width: 75%;
    `}
`;

const LockedMessageContent = styled.div`

    position: absolute;
    top: 50%;
    left: 50%;

    width: 80%;
    margin: auto;
    padding: 16px;
    text-align: center;

    -webkit-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);


`;

const PlayButton = styled.img`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    -mos-transform: translateX(-50%) translateY(-50%);
    -o-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    width: 100px;
    height: 100px;
`;

const PostThumbnail: React.SFC<Props> = ({post, access}) => {

    if (post.post_type === PostType.TEXT) {
        return null;
    }
    const url = `single_video?v=${post.post_media_content.id}&p=${post.post_id}`
    let styles: any = {
        width: '100%', height: 'auto', marginTop: '8px',
    }
    if (!access) {
        styles.filter = 'blur(25px)';
    }
    return (
        <div style={{position: 'relative', overflow: 'hidden'}}>
            {access ? (
                <Link to={url} style={{display: 'block'}}>
                    <LazyLoad height={300} debounce={300} once={true}>
                        <img style={styles} src={post.post_media_thumb} draggable={false}/>
                    </LazyLoad>
                    {post.post_type === PostType.VIDEO && <PlayButton src={PlayIcon}/>}
                </Link>
                ) : (
                    <LazyLoad height={300} debounce={300} once={true}>
                        <img style={styles} src={post.post_media_thumb} draggable={false}/>
                    </LazyLoad>
                )
            }

            {!access &&
            <LockedMessage>
                <LockedMessageContent>
                    <Typography variant='h6' style={{color: 'white', fontFamily: 'MarkOT-Book'}}>Subscribe to {post.creator_profile_name} to unlock their </Typography>
                    <Typography variant='h6' style={{display: 'inline', color: premiumBlueColor, fontFamily: 'MarkOT-Book'}}> PREMIUM </Typography>
                    <Typography variant='h6' style={{color: 'white', fontFamily: 'MarkOT-Book'}}>Content!</Typography>
                    <COLPrimaryButton style={{margintop: '8px', backgroundColor: orangeColor}}>Support Levels</COLPrimaryButton>
                </LockedMessageContent>
            </LockedMessage>
            }

        </div>
    );
}

export default PostThumbnail;
import * as React from 'react';
import PostModel, { PostType } from "../../models/PostModel";
import Link from '../Link/Link';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import { media } from '../../util/theme';
import Typography from '../Typography/Typography';
import COLPrimaryButton from '../Button/COLPrimaryButton';

interface Props {
    post: PostModel
    access: boolean
}

const LockedMessage = styled.div`

    position: absolute;
    top: 0;
    right: 0;
    width: 100%;

    background-color: red;
    ${media.tablet`
        background-color: blue;
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
        <div style={{position: 'relative'}}>
            <Link to={url}>
                <LazyLoad height={300} debounce={300} once={true}>
                    <img style={styles} src={post.post_media_thumb} draggable={false}/>
                </LazyLoad>
            </Link>
            {!access &&
            <LockedMessage>
                <LockedMessageContent>
                    <Typography variant='body2' style={{color: 'white'}}>Subscribe to ${post.creator_profile_name} to unlock their 
                    <Typography variant='body2' style={{textTransform: 'uppercase'}}>Premium</Typography> Content!
                    </Typography>
                    <COLPrimaryButton style={{backgroundColor: 'orange'}}>Support Levels</COLPrimaryButton>
                </LockedMessageContent>
            </LockedMessage>
            }

        </div>
    );
}

export default PostThumbnail;
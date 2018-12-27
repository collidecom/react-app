import * as React from 'react';
import PostModel, { PostType, PostAccess } from '../../models/PostModel';
import ProfileImage from '../Image/ProfileImage';
import Link from '../Link/Link';
import Typography from '../Typography/Typography';
import styled from 'styled-components';
import { grayTextColor } from '../../util/theme';
import PostAccessLabel from './PostAccessLabel';
import PostDate from './PostDate';
import PostThumbnail from './PostThumbnail';
import PostLike from './PostLike';
import { inject, observer } from 'mobx-react';
import StarModel from '../../models/StarModel';
import COLTextButton from '../Button/COLTextButton';
import ApiClient from '../../util/ApiClient';
import MediaModel, { thumbnailForMedia } from '../../models/MediaModel';
import LibraryThumbnail from './LibraryThumbnail';


const StyledLink = styled(Link)`
    &:hover {
        background-color: transparent;
    }
`;

export interface PostProps {
    media: MediaModel;
    star: StarModel;
    access: boolean;
}

const Library: React.SFC<PostProps> = inject('rootStore')(observer((props) => {

    const { media, star, access, rootStore } = props;
    
    const { mediaStore } = rootStore;

    return (
        <div>
            <COLTextButton
                fullWidth={true}
                style={{padding: 0}}
                onClick={() => {
                    mediaStore.getMedia(media.id);
                }}
            >
            
            <LibraryThumbnail
                star={star}
                media={media}
                access={access}
            />
            </COLTextButton>
            {/* <Link to={`single_video?v=${post.post_media_content.id}&p=${post.post_id}`}> */}
            <COLTextButton
                onClick={() => {
                    console.log(rootStore.authStore.user);
                }}
            >
                <Typography variant='body1' style={{ display: 'inline', wordWrap: 'break-word' }}>{media.name}</Typography>
            </COLTextButton>
            {/* </Link> */}
            <div style={{ display: 'flex' }}>
                <PostDate
                    postDate={media.published}
                />
                <PostAccessLabel
                    postAccess={media.credits_price === 0 ? PostAccess.PUBLIC : PostAccess.SUBSCRIBED}
                />
            </div>
        </div>
    );

}))

export default Library;
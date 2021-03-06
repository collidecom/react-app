import * as React from 'react';
import PostModel, { PostType } from '../../models/PostModel';
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


const StyledLink = styled(Link)`
    &:hover {
        background-color: transparent;
    }
`;

export interface PostProps {
    post: PostModel
    star: StarModel
    access: boolean
    onLike: () => void
}
export const Post: React.SFC<PostProps> = inject('rootStore')(observer((props) => {

    const { post, star, access, rootStore } = props;
    
    const { mediaStore } = rootStore;

    return (
        <div style={{ padding: '16px' }}>
            <StyledLink to={star.profile_name_url} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <ProfileImage
                    src={star.profile_image}
                />
                <Typography
                    variant='h6'
                    style={{ marginLeft: '8px' }}
                >
                    {post.creator_profile_name}
                </Typography>
            </StyledLink>
            <br />
            <COLTextButton
                fullWidth={true}
                onClick={() => {
                    mediaStore.getMedia(post.post_media_content.id);
                    // ApiClient.get(`media/${post.post_media_content.id}`).then((media) => {
                    //     rootStore.playerStore.setMedia(media);
                    // })
                }}
            >

            <PostThumbnail
                post={post}
                access={access}
            />
            </COLTextButton>
            {/* <Link to={`single_video?v=${post.post_media_content.id}&p=${post.post_id}`}> */}
            <COLTextButton
                onClick={() => {
                    console.log(rootStore.authStore.user);
                }}
            >
                <Typography variant='h6' style={{ marginTop: '16px', display: 'inline', wordWrap: 'break-word' }}>{post.post_headline}</Typography>
            </COLTextButton>
            {/* </Link> */}
            <div style={{ display: 'flex' }}>
                <PostDate
                    postDate={post.post_raw_date}
                />
                <PostAccessLabel
                    postAccess={post.post_access}
                />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <PostLike
                    liked={post.post_is_liked}
                    {...props}
                />
                <Typography variant='body2' style={{ color: grayTextColor }}>
                    {post.post_likes} {post.post_likes === 1 ? 'Like' : 'Likes'}
                </Typography>
            </div>
        </div>
    );

}))
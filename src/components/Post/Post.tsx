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


const StyledLink = styled(Link)`
    &:hover {
        background-color: transparent;
    }
`;

interface Props {
    post: PostModel
    access: boolean
    onLike: () => void,
}
export const Post: React.SFC<Props> = ({post, access, onLike}) => (
    <div style={{padding: '16px'}}>
        <StyledLink to={post.star.profile_name_url} style={{display: 'inline-flex', alignItems: 'center'}}>
            <ProfileImage
                imageURL={post.star.profile_image}
            />
            <Typography
                variant='h6'
                style={{marginLeft: '8px'}}
            >
            {post.creator_profile_name}
            </Typography>
        </StyledLink>
        <br/>
        <PostThumbnail
            post={post}
            access={access}
        />
        <Link to={`single_video?v=${post.post_media_content.id}&p=${post.post_id}`}>
            <Typography variant='h6' style={{marginTop: '16px'}}>{post.post_headline}</Typography>
        </Link>
        <div style={{display: 'flex'}}>
            <PostDate
                postDate={post.post_raw_date}
            />
            <PostAccessLabel
                postAccess={post.post_access}
            />
        </div>
        <div style={{display: 'inline-flex', alignItems: 'center'}}>
            <PostLike
                liked={post.post_is_liked}
                onLike={onLike}
            />
            <Typography variant='body2' style={{color: grayTextColor}}>
            {post.post_likes} {post.post_likes === 1 ? 'Like' : 'Likes'}
            </Typography>
        </div>
    </div>
);
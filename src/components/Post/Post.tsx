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
}
export const Post: React.SFC<Props> = ({post}) => (
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
        />
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
            />
            <Typography variant='body2' style={{color: grayTextColor}}>
            {post.post_likes} {post.post_likes === 1 ? 'Like' : 'Likes'}
            </Typography>
        </div>
    </div>
);
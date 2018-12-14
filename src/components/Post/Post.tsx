import * as React from 'react';
import PostModel from '../../models/PostModel';
import ProfileImage from '../Image/ProfileImage';
import Link from '../Link/Link';
import Typography from '../Typography/Typography';
import styled from 'styled-components';
import { grayBackgroundColor, grayTextColor, charcoalGrayColor } from '../../util/theme';
import COLTextButton from '../Button/COLTextButton';
const LikedIcon = require('../../img/icon-like-dark.svg') as string;
const LikeIcon = require('../../img/like-icon.svg') as string;


const StyledLink = styled(Link)`
    &:hover {
        background-color: transparent;
    }
`;

const LikeComponent = (liked: boolean) => {
    let icon: string;
    let label: string;
    let color: string;
    if (liked) {
        icon = LikedIcon;
        label = 'Liked'
        color = charcoalGrayColor;
    }
    else {
        icon = LikeIcon;
        label = 'Like'
        color = grayTextColor;
    }

    return (
        <COLTextButton style={{paddingLeft: 0}}>
            <img src={icon} style={{marginRight: '8px'}}/>
            <Typography variant='body2' style={{color: color}}>{label}</Typography>
        </COLTextButton>
    );
}

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
        <div style={{display: 'inline-flex', alignItems: 'center'}}>
            {LikeComponent(post.post_is_liked)}
            <Typography variant='body2' style={{color: grayTextColor}}>
            {post.post_likes} {post.post_likes === 1 ? 'Like' : 'Likes'}
            </Typography>
        </div>
    </div>
);
import * as React from 'react';
import PostModel from '../../models/PostModel';
import ProfileImage from '../Image/ProfileImage';
import Link from '../Link/Link';
import Typography from '../Typography/Typography';
import styled from 'styled-components';
import { grayBackgroundColor, grayTextColor } from '../../util/theme';
import COLTextButton from '../Button/COLTextButton';
const LikedIcon = require('../../img/icon-like-dark.svg') as string;


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
        <div style={{display: 'inline-flex', alignItems: 'center'}}>
            <COLTextButton style={{paddingLeft: 0}}>
                <img src={LikedIcon} style={{marginRight: '8px'}}/>
                Liked
            </COLTextButton>
            <Typography variant='body2' style={{color: grayTextColor}}>2 Likes</Typography>
        </div>
    </div>
);
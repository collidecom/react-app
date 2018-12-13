import * as React from 'react';
import PostModel from '../../models/PostModel';
import ProfileImage from '../Image/ProfileImage';
import Link from '../Link/Link';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { grayBackgroundColor } from '../../util/theme';

const StyledLink = styled(Link)`
    &:hover {
        background-color: ${grayBackgroundColor};
    }
`;
interface Props {
    post: PostModel
}
export const Post: React.SFC<Props> = ({post}) => (
    <div>
        <div>
            <StyledLink to={post.star.profile_name_url} style={{display: 'inline-flex', alignItems: 'center'}}>
                <ProfileImage
                    imageURL={post.star.profile_image}
                />
                <Typography variant='body1'>{post.creator_profile_name}</Typography>
            </StyledLink>
        </div>
    </div>
);
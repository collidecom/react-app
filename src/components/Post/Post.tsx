import * as React from 'react';
import PostModel from '../../models/PostModel';
import ProfileImage from '../Image/ProfileImage';
import Link from '../Link/Link';
import { Typography } from '@material-ui/core';

interface Props {
    post: PostModel
}
export const Post: React.SFC<Props> = ({post}) => (
    <div>
        <div>
            <Link to={post.star.profile_name_url} style={{display: 'flex', alignItems: 'center'}}>
                <ProfileImage
                    imageURL={post.star.profile_image}
                />
                <Typography variant='body1'>{post.creator_profile_name}</Typography>
            </Link>
        </div>
    </div>
);
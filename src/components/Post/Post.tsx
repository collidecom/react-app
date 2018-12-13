import * as React from 'react';
import PostModel from '../../models/PostModel';
import ProfileImage from '../Image/ProfileImage';

interface Props {
    post: PostModel
}
export const Post: React.SFC<Props> = ({post}) => (
    <div>
        <ProfileImage
            creatorURL={post.star.profile_name_url}
            profileImageURL={post.star.profile_image}
        />
    </div>
);
import * as React from 'react';
import PostModel, { PostType } from "../../models/PostModel";

interface Props {
    post: PostModel
}
const PostThumbnail: React.SFC<Props> = ({post}) => {

    if (post.post_type === PostType.TEXT) {
        return null;
    }
    return (
        <img style={{width: '100%', height: 'auto'}} src={post.post_media_thumb}/>
    );
}

export default PostThumbnail;
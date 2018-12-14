import * as React from 'react';
import PostModel, { PostType } from "../../models/PostModel";
import Link from '../Link/Link';

interface Props {
    post: PostModel
}
const PostThumbnail: React.SFC<Props> = ({post}) => {

    if (post.post_type === PostType.TEXT) {
        return null;
    }
    const url = `single_video?v=${post.post_media_content.id}&p=${post.post_id}`
    return (
        <Link to={url}>
            <img style={{width: '100%', height: 'auto', marginTop: '8px'}} src={post.post_media_thumb}/>
        </Link>
    );
}

export default PostThumbnail;
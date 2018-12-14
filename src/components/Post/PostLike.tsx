import * as React from 'react';
import COLTextButton from '../Button/COLTextButton';
import { charcoalGrayColor, grayTextColor } from '../../util/theme';
import Typography from '../Typography/Typography';
const LikedIcon = require('../../img/icon-like-dark.svg') as string;
const LikeIcon = require('../../img/like-icon.svg') as string;

interface Props {
    liked: boolean
}
const PostLike: React.SFC<Props> = ({liked}) => {
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

export default PostLike;
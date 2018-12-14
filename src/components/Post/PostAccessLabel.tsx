import * as React from 'react';
import { PostAccess } from '../../models/PostModel';
import { grayTextColor, premiumBlueColor } from '../../util/theme';
import Typography from '../Typography/Typography';
import { ReactComponent as PremiumIcon } from '../../img/premiumIcon.svg';

interface Props {
    postAccess: PostAccess
}

const PostAccessLabel: React.SFC<Props> = ({postAccess}) => {

    let textColor: string;
    let label: string;
    if (postAccess === PostAccess.PUBLIC) {
        textColor = grayTextColor;
        label = 'PUBLIC';
    }
    else {
        textColor = premiumBlueColor;
        label = 'PREMIUM';
    }
    
    return (
        <Typography variant='body2' style={{color: textColor, flexShrink: 0}}>
        {postAccess === PostAccess.SUBSCRIBED && PremiumIcon}
        {label}
        </Typography>
    );

}

export default PostAccessLabel;
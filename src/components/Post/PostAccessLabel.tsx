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
        <div style={{display: 'flex', alignItems: 'center'}}>
            {postAccess === PostAccess.SUBSCRIBED && <PremiumIcon style={{width: '16px', height: '16px', marginRight: '4px'}}/>}
            <Typography variant='body2' style={{color: textColor, flexShrink: 0}}>
            {label}
            </Typography>
        </div>

    );

}

export default PostAccessLabel;
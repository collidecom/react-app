import * as React from 'react';
import Typography from '../Typography/Typography';
import ProfileImage from '../Image/ProfileImage';
import Link from '../Link/Link';
import StarModel from '../../models/StarModel';
import COLPrimaryButton from '../Button/COLPrimaryButton';
import styled from 'styled-components';
import throwError from '../../util/ThrowError';
import { ReactComponent as FollowersIcon } from '../../img/icon-followers.svg';
import { ReactComponent as MediaIcon } from '../../img/icon-media.svg';
import { inject, observer } from 'mobx-react';

interface Props {
    star: StarModel;
}

const StyledButton = styled(COLPrimaryButton)`
    && {
        font-size: 14px;
        height: 32px;
        min-height: 32px;
        border-radius: 2px;
        line-height: 1;
    }
`;

enum StatType {
    FOLLOWERS,
    MEDIA,
}
interface StatProps {
    type: StatType;
    count: number;
}

const CreatorStat: React.FunctionComponent<StatProps> = (props) => {

    const { type, count } = props;
    let label;
    let Image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    switch (type) {
        case StatType.FOLLOWERS:
            label = 'followers';
            Image = FollowersIcon;
            break;
        case StatType.MEDIA:
            label = 'media';
            Image = MediaIcon;
            break;
        default:
            throw new Error(`invalid StatType ${type}`);
    }

    return (
        <div
            style={{marginRight: '8px'}}
        >
            <div style={{textAlign: 'right'}}>
            <Image style={{marginRight: '4px'}}/>
            <Typography style={{display: 'inline'}}>{count}</Typography>
            </div>
            <Typography>{label}</Typography>
        </div>
    );

};

export const CreatorHeader: React.SFC<Props> = inject('rootStore')(observer((props) => {

    const { star, rootStore } = props;
    const { creatorProfileStore } = rootStore;

    return (
        <div style={{position: 'relative'}}>
            <Link to={star.profile_name_url}>
                <ProfileImage
                    width='72'
                    height='72'
                    src={star.profile_image}
                />
            </Link>
            <Typography variant='h5'>{star.profile_name}</Typography>
            <div style={{position: 'absolute', top: '8px', right: '8px'}}>
                <StyledButton
                    fullWidth={false}
                    style={{marginRight: '4px'}}
                    onClick={() => {
                        creatorProfileStore.follow(star);
                    }}
                >
                {star.is_favorite ? 'Unfollow': 'Follow'}
                </StyledButton>
                <StyledButton fullWidth={false}>More</StyledButton>
            </div>
            <div style={{position: 'absolute', bottom: '8px', right: '8px', display: 'flex'}}>
            <CreatorStat
                type={StatType.FOLLOWERS}
                count={star.followers}
            />
            <CreatorStat
                type={StatType.MEDIA}
                count={99}
            />
            </div>
        </div>
    );
}))

export default CreatorHeader;
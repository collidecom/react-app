import * as React from 'react';
import Paper from './Paper';
import { PaperProps } from '@material-ui/core/Paper';
import Typography from '../Typography/Typography';
import { UnderlinedLink } from '../Link/Link';
import COLPrimaryButton from '../Button/COLPrimaryButton';
import styled, { grayTextColor, charcoalGrayColor, grayBackgroundButtonColor } from '../../util/theme';
import { BASEURL } from '../../util/config';
import { createStyles, withStyles } from '@material-ui/core';
const ShareIcon = require('../../img/icon-share-link.svg') as string;
const ReferralIcon = require('../../img/icon-referral-link.svg') as string;

export enum GenerateLinkType {
    SHARE,
    REFERRAL
}

const styles = (theme: any) => createStyles({
    label: {
        flexDirection: 'column'
    }
});

const HeaderLabel = styled(Typography)`
    && {
        font-size: 18px;
        line-height: 1.1;
    }
`;

interface Props extends PaperProps {
    type: GenerateLinkType
    url: string
    classes?: any
}
const CreatorLinkPaper: React.SFC<Props> = (props) => {

    const { type, url, classes } = props;
    let headerLabel;
    let generateBackgroundColor;
    let textColor;
    let generateIcon;
    let generateLabel;
    let generateURL: string;
    let descriptionLabel;
    switch (type) {
        case GenerateLinkType.SHARE:
            headerLabel = 'Promote';
            textColor = 'white';
            generateBackgroundColor = charcoalGrayColor;
            generateIcon = ShareIcon;
            generateLabel = 'Generate Shareable Link';
            generateURL = BASEURL + 'creator' + url;
            descriptionLabel = `Use your personalized URL in your social media bios, posts, swipe-ups, and websites to invite fans to your page.`;
            break;
        case GenerateLinkType.REFERRAL:
            headerLabel = 'Referral Link';
            textColor = charcoalGrayColor;
            generateBackgroundColor = grayBackgroundButtonColor;
            generateIcon = ReferralIcon;
            generateLabel = 'Generate Referral Link';
            generateURL = BASEURL + 'creator' + url;
            descriptionLabel = `For every new Creator who signs up with your link, you'll get 3% of their net earnings.`;
            break;
        default:
            throw (`invalid generateLinkType ${type}`);
    }
    return (
        <Paper style={{ position: 'relative', marginTop: '8px' }} {...props}>
            <HeaderLabel variant='h6'>{headerLabel}</HeaderLabel>
            <UnderlinedLink to={url}
                style={{ position: 'absolute', top: '16px', right: '16px' }}
            >
                Learn More
            </UnderlinedLink>
            <COLPrimaryButton
                style={{ margin: '16px 0', padding: '16px', fontFamily: 'MarkOT-Book', fontSize: '14px', color: textColor, backgroundColor: generateBackgroundColor }}
                onClick={() => console.log(generateURL)}
                classes={{
                    label: classes.label
                }}
            >
                <img src={generateIcon} style={{ display: 'block', marginBottom: '8px' }} />
                {generateLabel}
            </COLPrimaryButton>
            <Typography variant='body2' style={{ color: grayTextColor }}>
                {descriptionLabel}
            </Typography>
        </Paper>
    );
}
// export default CreatorLinkPaper;
export default withStyles(styles)(CreatorLinkPaper);
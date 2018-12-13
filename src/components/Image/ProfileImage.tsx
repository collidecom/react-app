import * as React from 'react';
import StyledLink from '../Link/Link';
import styled from 'styled-components';

interface Props {
    creatorURL: string,
    profileImageURL: string,
}

const Image = styled.img`
    width: 48px;
    height: 48px;
`;

const ProfileImage = (props: Props) => (
    <StyledLink
        to={props.creatorURL}
    >
        <Image src={props.profileImageURL}/>
    </StyledLink>
);

export default ProfileImage;
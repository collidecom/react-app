import * as React from 'react';
import styled from 'styled-components';

interface Props {
    imageURL: string,
}

const Image = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 24px;
`;

const ProfileImage: React.SFC<Props> = (props) => (
    <Image width={90} src={props.imageURL}/>
);

export default ProfileImage;
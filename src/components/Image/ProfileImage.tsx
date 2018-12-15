import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLProps<HTMLImageElement> {
    src: string
}

const ProfileImage: React.SFC<Props> = (props) => (
    <img
        width={props.width || '48px'}
        height={props.height || '48px'}
        style={{ borderRadius: '50%' }}
        src={props.src}
    />
);

export default ProfileImage;
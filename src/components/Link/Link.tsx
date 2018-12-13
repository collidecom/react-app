import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    && {
        text-decoration: none;
        color: inherit;
    }
`;

export default StyledLink;
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(RouterLink)`
    && {
        text-decoration: none;
        color: inherit;
    }
`;

export default Link;
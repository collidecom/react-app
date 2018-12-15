import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { azulColor } from '../../util/theme';

const Link = styled(RouterLink)`
    && {
        text-decoration: none;
        color: inherit;
    }
`;

export const UnderlinedLink = styled(RouterLink)`
    && {
        font-family: MarkOT-Bold;
        font-size: 14px;
        color: ${azulColor};
        &:hover {
            opacity: .75;
        }
    }
`;

export default Link;
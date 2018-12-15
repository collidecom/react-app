import * as React from 'react';
import styled from 'styled-components';
import { Paper as MuiPaper } from '@material-ui/core';
import { PaperProps } from '@material-ui/core/Paper';

const Paper = styled(MuiPaper as React.SFC<PaperProps>)`
    && {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
    }
`;

export default Paper;
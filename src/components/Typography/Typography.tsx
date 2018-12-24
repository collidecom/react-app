import * as React from 'react';
import MuiTypography, { TypographyProps } from '@material-ui/core/Typography';
import styled from 'styled-components';

const Typography: React.StatelessComponent<TypographyProps> = props => (
    <MuiTypography
      color='primary'
      {...props}
    >
    {props.children}
    </MuiTypography>
);

export const COLHeader = styled(Typography)`
  && {
    font-size: 22px;
    font-family: MarkOT-Bold;
    text-align: ${props => props.align || 'inherit'};
  }
`;

export default Typography; 
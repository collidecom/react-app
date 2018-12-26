import * as React from 'react';
import MuiTypography, { TypographyProps } from '@material-ui/core/Typography';
import styled from 'styled-components';
import { orangeColor, grayTextColor } from '../../util/theme';

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

export const COLInstructionHeader = styled(Typography)`
  && {
    font-size: 18px;
    font-family: MarkOT-Medium;
  }
`;

export const COLSubHeader = styled(Typography)`
  && {
    font-size: 16px;
    font-family: MarkOT-Medium;
    text-align: ${props => props.align || 'inherit'};
    color: ${grayTextColor};
  }
`;


export const COLErrorMessage = styled(Typography)`
  && {
    font-size: 14px;
    color: ${orangeColor};
  }
`;

export default Typography; 
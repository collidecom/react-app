import * as React from 'react';
import MuiTypography, { TypographyProps } from '@material-ui/core/Typography';

const Typography: React.StatelessComponent<TypographyProps> = props => (
    <MuiTypography
      color='primary'
      {...props}
    >
    {props.children}
    </MuiTypography>
);

export default Typography; 
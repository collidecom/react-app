import * as React from 'react';
import MuiGrid, { GridProps } from '@material-ui/core/Grid';

interface Props extends GridProps {

}
const Grid: React.SFC<Props> = (props) => (
    <MuiGrid
        {...props}
    >
        {props.children}
    </MuiGrid>
);

export default Grid;
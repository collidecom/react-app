import * as React from 'react';
import { Tooltip as MuiTooltip, createStyles, withStyles } from '@material-ui/core';
import { TooltipProps } from '@material-ui/core/Tooltip';

const styles = () => createStyles({
    popper: {
        opacity: 1,
    },
    lightTooltip: {
        backgroundColor: 'white',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
        padding: '16px',
    },
});

interface Props extends TooltipProps {
    classes?: any,
}

const Tooltip = (props: Props) => (
    <MuiTooltip
        {...props}
        leaveDelay={100000}
        disableTouchListener    // Default behavior on touch devices is long press to show tooltip.
        classes={{ popper: props.classes.popper, tooltip: props.classes.lightTooltip }}
    >
        {props.children}
    </MuiTooltip>
);

export default withStyles(styles)(Tooltip);
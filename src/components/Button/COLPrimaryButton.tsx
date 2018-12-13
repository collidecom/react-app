import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';

interface Props extends ButtonProps {
  dark?: boolean;
}

const ButtonBase: React.StatelessComponent<Props> = props => (
  <Button
    variant="contained"
    fullWidth={true}
    color={props.color ? props.color : 'primary'}
    {...props}
  >{
      props.children}
  </Button>
);

export const COLPrimaryButton = styled(ButtonBase)`
  && { 
    font-size: 16px;
    font-family: MarkOT;
    min-height: 48px;
    text-transform: none;
    box-shadow: none;
  }
`;

export default COLPrimaryButton; 
import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';

interface Props extends ButtonProps {
  dark?: boolean;
}

const ButtonBase: React.StatelessComponent<Props> = props => (
  <Button
    color={props.color ? props.color : 'primary'}
    {...props}
  >{
      props.children}
  </Button>
);

const COLTextButton = styled(ButtonBase)`
  && { 
    font-size: 14px;
    font-family: MarkOT;
    min-height: 48px;
    text-transform: none;
    box-shadow: none;
  }
`;

export default COLTextButton; 
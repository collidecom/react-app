import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';
import { azulColor } from '../../util/theme';

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

const COLUnderlinedButton = styled(ButtonBase)`
  && { 
    font-size: 16px;
    font-family: MarkOT-Medium;
    color: ${azulColor};
    text-decoration: underline;
    /* min-height: 48px; */
    text-transform: none;
    box-shadow: none;
    &:hover {
      background-color: transparent;
      text-decoration: none;
    }
  }
`;

export default COLUnderlinedButton; 
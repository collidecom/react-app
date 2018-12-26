import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';

interface Props extends ButtonProps {
  dark?: boolean;
  border?: boolean
}

const ButtonBase: React.StatelessComponent<Props> = props => (
  <Button
    color={props.color ? props.color : 'primary'}
    {...props}
  >{
      props.children}
  </Button>
);

const COLTextButton = styled(ButtonBase as React.SFC<Props>)`
  && { 
    font-size: 14px;
    font-family: MarkOT;
    min-height: 48px;
    text-transform: none;
    box-shadow: none;
    &:hover {
      background-color: transparent;
    }
    border-style: ${(props: Props) => props.border ? 'solid' : 'none'};
    border-width: ${(props: Props) => props.border ? '1px' : '0'};
    border-color: ${(props: Props) => props.border ? 'inherit': 'none'};
  }
`;

export default COLTextButton; 
import * as React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { TextFieldProps, StandardTextFieldProps } from '@material-ui/core/TextField';

export const COLTextField = styled(TextField as React.SFC<StandardTextFieldProps>)`
  && {
    font-size: 16px;
    font-family: MarkOT;
    margin-top: 16px;
    min-height: 44px;
    text-transform: none;
  }
`;

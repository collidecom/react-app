import * as React from 'react';
import styled from 'styled-components';

interface Props {
    direction?: 'horizontal' | 'vertical'
}

const defaultProps: Props = {
    direction: 'horizontal'
}

const FlexContainer = styled.div`
    display: flex;
    align-items: ${(props: Props) => props.direction === 'horizontal' ? 'center' : 'stretch'};
    justify-content: ${(props: Props) => props.direction === 'vertical' ? 'center' : 'flex-start'};
`;

FlexContainer.defaultProps = defaultProps;

export default FlexContainer;
import styled from 'styled-components';

export const ErrorText = styled.p`
  color: ${(props) => (props.error ? 'red' : 'inherit')};
  font-size: ${(props) => (props.error ? '12px' : 'inherit')};
`;

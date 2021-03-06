import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 7px;
  border-radius: 5px;
  border-color: ${(props) => (props.error ? 'red' : 'light-grey')};
`;
export const P = styled.p`
  color: ${(props) => (props.error ? 'red' : 'inherit')};
  font-size: ${(props) => (props.error ? '12px' : 'inherit')};
`;

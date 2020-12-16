import styled from 'styled-components';

export const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 5px;
  border-color: ${(props) => (props.error ? 'red' : 'light-grey')};
`;

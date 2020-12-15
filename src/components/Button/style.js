import styled from 'styled-components';

const Button = styled.button`
  padding: 4px;
  margin-top: 10px;
  margin-right: 4px;
  background: ${(props) => (props.color ? 'green' : '')};
  /* right: ${(props) => (props.color ? '30px' : '50px')}; */
  /* position: absolute; */
`;

export default Button;

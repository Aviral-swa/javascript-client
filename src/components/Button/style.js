import styled from 'styled-components';

const Buttons = styled.button`
  padding: 8px 17px;
  margin-top: 10px;
  margin-right: 4px;
  left: 80%;
  position: relative;
  border-radius: 7px;
  border: 1px solid #b0b0b0;
  background-color: ${(props) => (props.highlight ? '#5dc62d' : '')};
  color: ${(props) => (props.highlight ? 'white' : 'black')};
`;

export default Buttons;

import styled from 'styled-components';

export const Img = styled.img`
  margin: 20px auto;
  display: block;
`;

export const Div = styled.div`
  background: ${(props) => (props.sliderBg ? '#f1f0f0' : '#fff')};
`;

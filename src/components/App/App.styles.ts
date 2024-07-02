import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: hidden;
  background: lightgrey;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 750px;
  width: 100%;
  height: 90vh;

  @media (max-width: 850px) {
    height: 100vh;
  }
`;

export { Background, Wrapper };

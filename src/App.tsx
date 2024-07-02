import styled from 'styled-components';
import Header from './components/Header';
import Container from './components/Container';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: hidden;
  background: lightgray;
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

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

function App() {
  return (
    <Background>
      <Wrapper>
        <Header />
        <MainWrapper>
          <Container />
        </MainWrapper>
      </Wrapper>
    </Background>
  );
}

export default App;

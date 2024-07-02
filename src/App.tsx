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
  max-width: 750px;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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

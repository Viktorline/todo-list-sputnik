import styled from 'styled-components';
import Header from './components/Header';
import Main from './components/Main';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: beige;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  max-width: 750px;
  width: 100%;
`;

function App() {
  return (
    <Wrapper>
      <Container>
        <Header />
        <Main />
      </Container>
    </Wrapper>
  );
}

export default App;

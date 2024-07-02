import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';
import { Background, Wrapper } from './App.styles';

function App() {
  return (
    <Background>
      <Wrapper>
        <Header />
        <MainContent />
      </Wrapper>
    </Background>
  );
}

export default App;

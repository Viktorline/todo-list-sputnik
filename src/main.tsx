import ReactDOM from 'react-dom/client';
import App from './components/App/App.tsx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;

export default GlobalStyle;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <App />
  </>
);

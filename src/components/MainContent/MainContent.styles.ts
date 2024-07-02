import { styled } from 'styled-components';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const NoTasksMessage = styled.p`
  display: flex;
  justify-content: center;
  padding: 2rem;
  font-size: medium;
  color: #747474;
  background-color: #f8f8f8;
`;

export { Wrapper, SpinWrapper, NoTasksMessage };

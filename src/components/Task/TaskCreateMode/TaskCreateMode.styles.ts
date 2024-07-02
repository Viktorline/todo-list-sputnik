import { Input } from 'antd';
import { styled } from 'styled-components';

const DescriptionInput = styled(Input.TextArea)`
  height: fit-content;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

export { DescriptionInput, Controls };

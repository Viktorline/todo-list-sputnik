import { Button } from 'antd';
import { styled } from 'styled-components';

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TextWrapper = styled.div`
  flex: 1;
  word-break: break-word;
  white-space: normal;
`;

const Header = styled.h3``;

const Description = styled.p``;

const CheckButton = styled(Button)`
  &.completed {
    background-color: #52c41a;
    border-color: #52c41a;
    color: white;
  }

  &:hover {
    border-color: #52c41a !important;
    color: #52c41a !important;
  }

  &:active {
    background-color: #52c41a !important;
    border-color: #52c41a !important;
    color: white !important;
  }
`;

const StarButton = styled(Button)`
  background-color: #fff;
  border-color: #d9d9d9;
  color: initial;

  &.favorite {
    background-color: #ffba00;
    border-color: #ffba00;
    color: white;
  }

  &:hover {
    border-color: #ffba00 !important;
    color: #ffba00 !important;
  }
  &:active {
    background-color: #ffba00 !important;
    border-color: #ffba00 !important;
    color: white !important;
  }
`;

const EditButton = styled(Button)`
  &:hover {
    border-color: #2b7de1 !important;
    color: #2b7de1 !important;
  }
  &:active {
    background-color: #2b7de1 !important;
    border-color: #2b7de1 !important;
    color: white !important;
  }
`;

const BucketButton = styled(Button)`
  &:hover {
    border-color: #e12b2b !important;
    color: #c41a2e !important;
  }
  &:active {
    background-color: #e12b2b !important;
    border-color: #e12b2b !important;
    color: white !important;
  }
`;

export {
  TaskWrapper,
  ButtonGroup,
  TextWrapper,
  Header,
  Description,
  CheckButton,
  StarButton,
  EditButton,
  BucketButton,
};

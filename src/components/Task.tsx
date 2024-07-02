import { RefObject, useRef } from 'react';
import styled from 'styled-components';
import { Button, Input, Select, Tooltip } from 'antd';
import { useClickOutside } from '../hooks/useClickOutside';
import { taskTypes } from '../content/constants';
import {
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';
import { TaskType } from '../store/types';

const { Option } = Select;

const Wrapper = styled.div`
  padding: 2rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);

  &.completed {
    background-color: #c1fab2;
    border-color: #e0ffd0;
  }
`;

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

const TitleInput = styled(Input)`
  margin-bottom: 0.5rem;
`;

const DescriptionInput = styled(Input.TextArea)`
  height: fit-content;
  margin-bottom: 0.5rem;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
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

interface EditableBlockProps {
  id: string;
  mode: 'await' | 'create' | 'view';
  title: string;
  description: string;
  status: TaskType;
  buttonText: string;
  isFavorite?: boolean;
  onClick: () => void;
  onClose: () => void;
  onSave: () => void;
  onCheck?: () => void;
  onDelete?: (value: string) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: TaskType) => void;
  onFavoriteToggle?: () => void;
  wrapperRef?: RefObject<HTMLDivElement> | null;
}

function Task({
  id,
  mode,
  title,
  description,
  status,
  buttonText,
  isFavorite,
  onClick,
  onClose,
  onSave,
  onCheck,
  onDelete,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onFavoriteToggle,
  wrapperRef,
}: EditableBlockProps) {
  const editorFieldRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper
      ref={wrapperRef as React.RefObject<HTMLDivElement>}
      key={id}
      className={status === 'completed' ? 'completed' : ''}
    >
      <div ref={editorFieldRef}>
        {mode === 'view' ? (
          <TaskWrapper>
            <ButtonGroup>
              <Tooltip
                title={
                  isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'
                }
              >
                <StarButton
                  icon={isFavorite ? <StarFilled /> : <StarOutlined />}
                  className={isFavorite ? 'favorite' : ''}
                  onClick={onFavoriteToggle}
                />
              </Tooltip>
              <Tooltip
                title={
                  status === 'notCompleted'
                    ? 'Отметить как выполненное'
                    : 'Отметить как невыполненое'
                }
              >
                <CheckButton
                  className={status === 'completed' ? 'completed' : ''}
                  onClick={onCheck}
                  icon={<CheckOutlined />}
                />
              </Tooltip>
              <Tooltip title='Редактировать'>
                <EditButton onClick={onClick} icon={<EditOutlined />} />
              </Tooltip>
            </ButtonGroup>
            <TextWrapper>
              <Header>{title}</Header>
              <Description>{description}</Description>
            </TextWrapper>

            <Tooltip title='Удалить'>
              <BucketButton
                onClick={() => onDelete!(id)}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </TaskWrapper>
        ) : (
          <TitleInput
            placeholder={mode === 'await' ? 'Добавить задачу' : 'Заголовок'}
            value={title}
            onClick={mode !== 'create' ? onClick : () => {}}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        )}

        {mode === 'create' && (
          <>
            <DescriptionInput
              autoSize={{ minRows: 2, maxRows: 10 }}
              placeholder='Описание'
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
            <Controls>
              <Select
                value={status}
                onChange={onStatusChange}
                style={{ width: '100%', marginBottom: '0.5rem' }}
              >
                {taskTypes.map((item) => (
                  <Option key={item.key} value={item.key}>
                    {item.label}
                  </Option>
                ))}
              </Select>
              <Button
                type='primary'
                onClick={onSave}
                disabled={title.trim().length === 0}
              >
                {buttonText}
              </Button>
              <Button type='default' onClick={onClose}>
                Отменить
              </Button>
            </Controls>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default Task;

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Input, Row, Select, Space, Spin, Tooltip } from 'antd';
import { useClickOutside } from '../hooks/useClickOutside';
import { filterItems } from '../content/constants';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const Wrapper = styled.div`
  padding: 2rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
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
  word-wrap: break-word;
  white-space: normal;
`;

const CheckButton = styled(Button)<{ status: string }>`
  background-color: ${(props) =>
    props.status === 'completed' ? '#52c41a' : '#fff'};
  border-color: ${(props) =>
    props.status === 'completed' ? '#52c41a' : '#d9d9d9'};
  color: ${(props) => (props.status === 'completed' ? 'white' : 'initial')};

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
  status: string;
  buttonText: string;
  onClick: () => void;
  onClose: () => void;
  onSave: () => void;
  onCheck?: () => void;
  onDelete?: (value: string) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

function Task({
  id,
  mode,
  title,
  description,
  status,
  buttonText,
  onClick,
  onClose,
  onSave,
  onCheck,
  onDelete,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
}: EditableBlockProps) {
  const editorFieldRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper key={id}>
      <div ref={editorFieldRef}>
        {mode === 'view' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Col style={{ display: 'flex', gap: '0.5rem' }}>
              <Tooltip
                title={
                  status === 'notCompleted'
                    ? 'Отметить как выполненное'
                    : 'Отметить как невыполненое'
                }
              >
                <CheckButton
                  status={status}
                  onClick={onCheck}
                  icon={<CheckOutlined />}
                />
              </Tooltip>
              <Tooltip title='Редактировать'>
                <EditButton onClick={onClick} icon={<EditOutlined />} />
              </Tooltip>
            </Col>
            <Col flex='auto'>
              <TextWrapper>
                <h3>{title}</h3>
                <span>{description}</span>
              </TextWrapper>
            </Col>
            <Col>
              <Tooltip title='Удалить'>
                <BucketButton
                  onClick={() => onDelete!(id)}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Col>
          </div>
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
                {filterItems
                  .filter((item) => item.key !== 'all')
                  .map((item) => (
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

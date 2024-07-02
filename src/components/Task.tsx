import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Input, Row, Select, Space, Spin } from 'antd';
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
              <Button icon={<CheckOutlined />} />
              <Button onClick={onClick} icon={<EditOutlined />} />
            </Col>
            <Col flex='auto'>
              <TextWrapper>
                <h3>{title}</h3>
                <span>{description}</span>
              </TextWrapper>
            </Col>
            <Col>
              <Button onClick={() => onDelete!(id)} icon={<DeleteOutlined />} />
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

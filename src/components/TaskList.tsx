import styled from 'styled-components';
import Task from './Task';
import { useState } from 'react';
import { TaskOwn } from '../store/types';
import { useTaskStore } from '../store/useTaskStore';

const Wrapper = styled.ul`
  overflow-y: auto;
  padding: 0;
`;

function TaskList({
  tasks,
  deleteTask,
}: {
  tasks: any;
  deleteTask: (id: string) => void;
}) {
  const [editableTaskId, setEditableTaskId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleEditClick = (task: TaskOwn) => {
    setEditableTaskId(task.id);
    setTitle(task.attributes.title);
    setDescription(task.attributes.description);
    setStatus(task.attributes.status);
  };

  const handleSave = () => {
    setEditableTaskId(null);
    setTitle('');
    setDescription('');
    setStatus('');
  };

  const handleClose = () => {
    setEditableTaskId(null);
    setTitle('');
    setDescription('');
    setStatus('');
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  return (
    <Wrapper>
      {tasks.map((task: TaskOwn) => {
        const { title, description, status } = task.attributes;

        return (
          <Task
            key={task.id}
            id={task.id}
            mode={editableTaskId === task.id ? 'create' : 'view'}
            title={title}
            description={description}
            status={status}
            onClick={() => handleEditClick(task)}
            onSave={handleSave}
            onClose={handleClose}
            onDelete={handleDelete}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onStatusChange={setStatus}
            buttonText={'Изменить'}
          />
        );
      })}
    </Wrapper>
  );
}

export default TaskList;

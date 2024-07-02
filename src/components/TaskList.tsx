import styled from 'styled-components';
import Task from './Task';
import { useEffect, useState } from 'react';
import { TaskOwn, TaskType } from '../store/types';

const Wrapper = styled.ul`
  overflow-y: auto;
  flex: 1;
`;

function TaskList({
  tasks,
  favoriteIds,
  editTask,
  deleteTask,
  toggleFavorite,
}: {
  tasks: any;
  favoriteIds: string[];
  editTask: (
    id: string,
    title: string,
    description: string,
    status: TaskType
  ) => void;
  deleteTask: (id: string) => void;
  toggleFavorite: (id: string) => void;
}) {
  const [editableTaskId, setEditableTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState<TaskType>('notCompleted');

  const handleFavoriteToggle = (id: string) => {
    toggleFavorite(id);
  };

  const handleEditClick = (task: TaskOwn) => {
    setEditableTaskId(task.id);
    setEditTitle(task.attributes.title);
    setEditDescription(task.attributes.description);
    setEditStatus(task.attributes.status);
  };

  const handleSave = (id: string, customStatus?: TaskType, task?: TaskOwn) => {
    editTask(
      id,
      task?.attributes.title ? task?.attributes.title : editTitle,
      task?.attributes.description
        ? task?.attributes.description
        : editDescription,
      customStatus ? customStatus : editStatus
    );
    setEditableTaskId(null);
    setEditTitle('');
    setEditDescription('');
    setEditStatus('notCompleted');
  };

  const handleCheck = (task: TaskOwn) => {
    task.attributes.status === 'completed'
      ? handleSave(task.id, 'notCompleted', task)
      : handleSave(task.id, 'completed', task);
  };

  const handleClose = () => {
    setEditableTaskId(null);
    setEditTitle('');
    setEditDescription('');
    setEditStatus('notCompleted');
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  useEffect(() => {
    const savedFavoriteIds = JSON.parse(
      localStorage.getItem('favoriteIds') || '[]'
    );
    savedFavoriteIds.forEach((id: string) => {
      if (!favoriteIds.includes(id)) toggleFavorite(id);
    });
  }, [toggleFavorite, favoriteIds]);

  return (
    <Wrapper>
      {tasks.map((task: TaskOwn) => {
        const { title, description, status } = task.attributes;
        const isEditable = editableTaskId === task.id;
        const isFavorite = favoriteIds.includes(task.id);

        return (
          <Task
            key={task.id}
            id={task.id}
            mode={isEditable ? 'create' : 'view'}
            title={isEditable ? editTitle : title}
            description={isEditable ? editDescription : description}
            status={isEditable ? editStatus : status}
            onClick={() => handleEditClick(task)}
            onSave={() => handleSave(task.id)}
            onCheck={() => handleCheck(task)}
            onClose={handleClose}
            onDelete={handleDelete}
            onTitleChange={setEditTitle}
            onDescriptionChange={setEditDescription}
            onStatusChange={setEditStatus}
            onFavoriteToggle={() => handleFavoriteToggle(task.id)}
            buttonText={'Изменить'}
            isFavorite={isFavorite}
          />
        );
      })}
    </Wrapper>
  );
}

export default TaskList;

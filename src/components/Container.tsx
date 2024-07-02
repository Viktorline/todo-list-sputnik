import styled from 'styled-components';
import Task from './Task';
import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Alert, Spin } from 'antd';
import TaskList from './TaskList';
import { TaskType } from '../store/types';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

function Container() {
  const {
    tasks,
    isLoadingLists,
    error,
    favoriteIds,
    addTask,
    editTask,
    deleteTask,
    toggleFavorite,
    fetchTasks,
  } = useTaskStore();

  const [mode, setMode] = useState<'await' | 'create' | 'view'>('await');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskType>('notCompleted');

  useEffect(() => {
    fetchTasks({});
  }, [fetchTasks]);

  const handleBlockClick = () => {
    if (mode === 'await') {
      setMode('create');
    }
  };

  const handleSave = async () => {
    addTask(title, description, status);
    setMode('await');
    setTitle('');
    setDescription('');
    setStatus('notCompleted');
  };

  const handleClose = () => {
    setMode('await');
    setTitle('');
    setDescription('');
    setStatus('notCompleted');
  };

  return (
    <Wrapper>
      <Task
        id={'123131313'}
        mode={mode}
        title={title}
        description={description}
        status={status}
        onClick={handleBlockClick}
        onSave={handleSave}
        onClose={handleClose}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onStatusChange={setStatus}
        buttonText={'Добавить'}
      />

      {error ? (
        <Alert message={'error'} type='error' />
      ) : isLoadingLists ? (
        <SpinWrapper>
          <Spin size='large' />
        </SpinWrapper>
      ) : (
        <TaskList
          favoriteIds={favoriteIds}
          tasks={tasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleFavorite={toggleFavorite}
          fetchTasks={async () => fetchTasks({}, true)}
        />
      )}
    </Wrapper>
  );
}

export default Container;

import { useEffect, useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Alert, Spin } from 'antd';
import { TaskType } from '../../models';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';
import { ADD_BUTTON, FILTER_NOT_COMPLETED_EN } from '../../constants/texts';
import { SpinWrapper, Wrapper, NoTasksMessage } from './MainContent.styles';

function MainContent() {
  const {
    tasks,
    error,
    favoriteIds,
    isLoadingLists,
    addTask,
    editTask,
    deleteTask,
    fetchTasks,
    toggleFavorite,
  } = useTaskStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskType>(FILTER_NOT_COMPLETED_EN);
  const [mode, setMode] = useState<'await' | 'create' | 'view'>('await');

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
    setStatus(FILTER_NOT_COMPLETED_EN);
  };

  const handleClose = () => {
    setMode('await');
    setTitle('');
    setDescription('');
    setStatus(FILTER_NOT_COMPLETED_EN);
  };

  return (
    <Wrapper>
      <Task
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
        buttonText={ADD_BUTTON}
      />

      {error ? (
        <Alert message={error} type='error' />
      ) : isLoadingLists ? (
        <SpinWrapper>
          <Spin size='large' />
        </SpinWrapper>
      ) : tasks.length === 0 ? (
        <NoTasksMessage>Задач по текущему фильтру нет</NoTasksMessage>
      ) : (
        <TaskList
          tasks={tasks}
          favoriteIds={favoriteIds}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleFavorite={toggleFavorite}
          fetchTasks={async () => fetchTasks({}, true)}
        />
      )}
    </Wrapper>
  );
}

export default MainContent;

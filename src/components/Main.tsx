import styled from 'styled-components';
import Task from './Task';
import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Button, Spin } from 'antd';
import TaskList from './TaskList';

const Wrapper = styled.main`
  padding: 0;
`;

function Main() {
  const { addTask, fetchTasks, deleteTask, isLoading, tasks } = useTaskStore();

  const [mode, setMode] = useState<'await' | 'create' | 'view'>('await');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('notCompleted');

  useEffect(() => {
    fetchTasks({});
  }, [fetchTasks]);

  const handleBlockClick = () => {
    if (mode === 'await') {
      setMode('create');
    }
  };

  const handleSave = async () => {
    addTask(title, description, 'notCompleted');
    setMode('await');
    setTitle('');
    setDescription('');
  };

  const handleClose = () => {
    setMode('await');
    setTitle('');
    setDescription('');
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
        buttonText={'Далее'}
      />
      {isLoading ? (
        <Spin size='large' />
      ) : (
        <TaskList deleteTask={deleteTask} tasks={tasks} />
      )}
    </Wrapper>
  );
}

export default Main;

import { useEffect, useState } from 'react';
import { TaskOwn, TaskType } from '../../models';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { SCROLL_LOAD_THRESHOLD_MESSAGE } from '../../constants/constants';
import Task from '../Task/Task';
import { Wrapper } from './TaskList.styles';
import {
  EDIT_BUTTON,
  FILTER_COMPLETED_EN,
  FILTER_NOT_COMPLETED_EN,
  LOCAL_STORAGE_FOLDER,
} from '../../constants/texts';

function TaskList({
  tasks,
  favoriteIds,
  fetchTasks,
  editTask,
  deleteTask,
  toggleFavorite,
}: {
  tasks: TaskOwn[];
  favoriteIds: string[];
  fetchTasks: () => Promise<void>;
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
  const [editStatus, setEditStatus] = useState<TaskType>(
    FILTER_NOT_COMPLETED_EN
  );
  const [isFetching, setIsFetching] = useState(false);

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
    setEditStatus(FILTER_NOT_COMPLETED_EN);
  };

  const handleCheck = (task: TaskOwn) => {
    task.attributes.status === FILTER_COMPLETED_EN
      ? handleSave(task.id, FILTER_NOT_COMPLETED_EN, task)
      : handleSave(task.id, FILTER_COMPLETED_EN, task);
  };

  const handleClose = () => {
    setEditableTaskId(null);
    setEditTitle('');
    setEditDescription('');
    setEditStatus(FILTER_NOT_COMPLETED_EN);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  useEffect(() => {
    const savedFavoriteIds = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_FOLDER) || '[]'
    );
    savedFavoriteIds.forEach((id: string) => {
      if (!favoriteIds.includes(id)) toggleFavorite(id);
    });
  }, [toggleFavorite, favoriteIds]);

  const handleFetchTasks = async () => {
    if (isFetching) return;
    setIsFetching(true);
    await fetchTasks();
    setIsFetching(false);
  };

  const { lastElementRef } = useInfiniteScroll(handleFetchTasks, isFetching);

  return (
    <Wrapper>
      {tasks.map((task: TaskOwn, index: number) => {
        const { title, description, status } = task.attributes;
        const isEditable = editableTaskId === task.id;
        const isFavorite = favoriteIds.includes(task.id);

        const isLastElement =
          tasks.length - SCROLL_LOAD_THRESHOLD_MESSAGE === index;

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
            buttonText={EDIT_BUTTON}
            isFavorite={isFavorite}
            wrapperRef={isLastElement ? lastElementRef : null}
          />
        );
      })}
    </Wrapper>
  );
}

export default TaskList;

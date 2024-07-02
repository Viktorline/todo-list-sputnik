import { RefObject } from 'react';
import { TaskType } from '../../models';
import TaskCreateMode from './TaskCreateMode/TaskCreateMode';
import TaskViewMode from './TaskViewMode/TaskViewMode';
import {
  FILTER_COMPLETED_EN,
  INITIAL_PLACEHOLDER,
  TITLE_PLACEHOLDER,
} from '../../constants/texts';
import { Wrapper, TitleInput } from './Task.styles';

interface EditableBlockProps {
  id?: string;
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
  wrapperRef?: RefObject<HTMLLIElement> | null;
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
  return (
    <Wrapper
      ref={wrapperRef as React.RefObject<HTMLLIElement>}
      key={id}
      className={status === FILTER_COMPLETED_EN ? FILTER_COMPLETED_EN : ''}
    >
      <>
        {mode === 'view' ? (
          <TaskViewMode
            id={id ? id : 'editor'}
            title={title}
            description={description}
            status={status}
            isFavorite={isFavorite!}
            onClick={onClick}
            onCheck={onCheck!}
            onDelete={onDelete!}
            onFavoriteToggle={onFavoriteToggle!}
          />
        ) : (
          <TitleInput
            placeholder={
              mode === 'await' ? INITIAL_PLACEHOLDER : TITLE_PLACEHOLDER
            }
            value={title}
            onClick={mode !== 'create' ? onClick : () => {}}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        )}

        {mode === 'create' && (
          <TaskCreateMode
            description={description}
            status={status}
            buttonText={buttonText}
            title={title}
            onSave={onSave}
            onClose={onClose}
            onDescriptionChange={onDescriptionChange}
            onStatusChange={onStatusChange}
          />
        )}
      </>
    </Wrapper>
  );
}

export default Task;

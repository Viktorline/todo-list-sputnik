import { Tooltip } from 'antd';
import {
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';
import { TaskType } from '../../../models';
import {
  TaskWrapper,
  ButtonGroup,
  TextWrapper,
  Header,
  Description,
  CheckButton,
  StarButton,
  EditButton,
  BucketButton,
} from './TaskViewMode.styles';
import {
  ADD_TO_FAVORITES,
  CHECK_AS_COMPLETED,
  CHECK_AS_UNCOMPLETED,
  DELETE_FROM_FAVORITES,
  DELETE_TIP,
  EDIT_TIP,
  FILTER_COMPLETED_EN,
  FILTER_FAVORITE_EN,
  FILTER_NOT_COMPLETED_EN,
} from '../../../constants/texts';

interface EditableBlockProps {
  id: string;
  title: string;
  description: string;
  status: TaskType;
  isFavorite?: boolean;
  onClick: () => void;
  onCheck?: () => void;
  onDelete?: (value: string) => void;
  onFavoriteToggle?: () => void;
}

function TaskViewMode({
  id,
  title,
  description,
  status,
  isFavorite,
  onClick,
  onCheck,
  onDelete,
  onFavoriteToggle,
}: EditableBlockProps) {
  return (
    <TaskWrapper>
      <ButtonGroup>
        <Tooltip title={isFavorite ? DELETE_FROM_FAVORITES : ADD_TO_FAVORITES}>
          <StarButton
            icon={isFavorite ? <StarFilled /> : <StarOutlined />}
            className={isFavorite ? FILTER_FAVORITE_EN : ''}
            onClick={onFavoriteToggle}
          />
        </Tooltip>
        <Tooltip
          title={
            status === FILTER_NOT_COMPLETED_EN
              ? CHECK_AS_COMPLETED
              : CHECK_AS_UNCOMPLETED
          }
        >
          <CheckButton
            className={
              status === FILTER_COMPLETED_EN ? FILTER_COMPLETED_EN : ''
            }
            onClick={onCheck}
            icon={<CheckOutlined />}
          />
        </Tooltip>
        <Tooltip title={EDIT_TIP}>
          <EditButton onClick={onClick} icon={<EditOutlined />} />
        </Tooltip>
      </ButtonGroup>
      <TextWrapper>
        <Header>{title}</Header>
        <Description>{description}</Description>
      </TextWrapper>

      <Tooltip title={DELETE_TIP}>
        <BucketButton onClick={() => onDelete!(id)} icon={<DeleteOutlined />} />
      </Tooltip>
    </TaskWrapper>
  );
}

export default TaskViewMode;

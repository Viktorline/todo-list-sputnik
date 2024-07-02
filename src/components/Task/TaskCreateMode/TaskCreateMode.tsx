import { Button, Select } from 'antd';
import { taskTypes } from '../../../constants/constants';
import { TaskType } from '../../../models';
import { DescriptionInput, Controls } from './TaskCreateMode.styles';
import { DESCRIPTION_PLACEHOLDER } from '../../../constants/texts';

const { Option } = Select;

interface TaskCreateModeProps {
  title: string;
  description: string;
  status: TaskType;
  buttonText: string;
  onClose: () => void;
  onSave: () => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: TaskType) => void;
}

function TaskCreateMode({
  title,
  description,
  status,
  buttonText,
  onClose,
  onSave,
  onDescriptionChange,
  onStatusChange,
}: TaskCreateModeProps) {
  return (
    <>
      <DescriptionInput
        autoSize={{ minRows: 2, maxRows: 10 }}
        placeholder={DESCRIPTION_PLACEHOLDER}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      <Controls>
        <Select
          value={status}
          onChange={onStatusChange}
          style={{ width: '100%' }}
        >
          {taskTypes.map((item) => (
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
  );
}

export default TaskCreateMode;

export type TaskType = 'completed' | 'notCompleted';

export type FilterType = 'all' | 'completed' | 'notCompleted' | 'favorite';
export interface TaskAttributes {
  title: string;
  description: string;
  status: TaskType;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TaskOwn {
  id: string;
  attributes: TaskAttributes;
}

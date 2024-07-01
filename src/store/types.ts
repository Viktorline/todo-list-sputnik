export interface TaskAttributes {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TaskOwn {
  id: string;
  attributes: TaskAttributes;
}

export type FilterType = 'all' | 'completed' | 'notCompleted' | 'favorite';

export type TaskType = Omit<FilterType, 'all'>;

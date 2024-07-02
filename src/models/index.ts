export interface FetchTasksParams {
  sort?: string;
  'pagination[withCount]'?: boolean;
  'pagination[page]'?: number;
  'pagination[pageSize]'?: number;
  'pagination[start]'?: number;
  'pagination[limit]'?: number;
  fields?: string;
  populate?: string;
  filters?: Record<string, any>;
  locale?: string;
}

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

import { create } from 'zustand';
import { FetchTasksParams, FilterType, TaskOwn, TaskType } from '../models';
import {
  postTask,
  getTasks,
  deleteTask,
  putTask,
  getTaskById,
} from '../api/todoApi';
import {
  ERROR_LOADING_TASKS,
  FILTER_ALL_EN,
  FILTER_FAVORITE_EN,
  LOCAL_STORAGE_FOLDER,
} from '../constants/texts';

export interface TaskState {
  tasks: TaskOwn[];
  favoriteIds: string[];
  filter: FilterType;
  isLoadingLists: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setFilter: (filter: FilterType) => void;
  addTask: (title: string, description: string, status: TaskType) => void;
  editTask: (
    id: string,
    title: string,
    description: string,
    status: TaskType
  ) => void;
  fetchTasks: (params?: FetchTasksParams, isLoadMore?: boolean) => void;
  fetchTasksByIds: (ids: string[]) => void;
  deleteTask: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filter: 'all',
  error: null,
  isLoadingLists: false,
  favoriteIds: JSON.parse(localStorage.getItem(LOCAL_STORAGE_FOLDER) || '[]'),
  currentPage: 1,
  totalPages: 1,

  setFilter: (filter: FilterType) => set({ filter }),

  toggleFavorite: (id: string) => {
    set((state) => {
      const isFavorite = state.favoriteIds.includes(id);
      const newFavoriteIds = isFavorite
        ? state.favoriteIds.filter((favId) => favId !== id)
        : [...state.favoriteIds, id];

      localStorage.setItem(
        LOCAL_STORAGE_FOLDER,
        JSON.stringify(newFavoriteIds)
      );

      return { favoriteIds: newFavoriteIds };
    });
  },

  fetchTasks: async (
    params: FetchTasksParams = {},
    isLoadMore: boolean = false
  ) => {
    const { currentPage, filter, totalPages } = get();

    if (
      filter === FILTER_FAVORITE_EN ||
      (currentPage >= totalPages && isLoadMore)
    )
      return;

    set({ isLoadingLists: !isLoadMore ? true : false, error: null });
    try {
      const page = isLoadMore ? currentPage + 1 : 1;
      const queryParams = {
        ...params,
        ...(filter !== FILTER_ALL_EN && {
          filters: { status: { $eq: filter } },
        }),
        pagination: {
          page,
          pageSize: 25,
        },
      };

      const response = await getTasks(queryParams);

      const newTasks = response.data as TaskOwn[];
      const { page: newPage, pageCount } = response.meta.pagination;

      const sortedTasks = newTasks.sort(
        (a, b) =>
          new Date(b.attributes.createdAt).getTime() -
          new Date(a.attributes.createdAt).getTime()
      );

      set((state) => ({
        tasks: isLoadMore ? [...state.tasks, ...sortedTasks] : sortedTasks,
        isLoadingLists: false,
        currentPage: newPage,
        totalPages: pageCount,
      }));
    } catch (error) {
      set({
        error: ERROR_LOADING_TASKS,
        isLoadingLists: false,
      });
    }
  },

  fetchTasksByIds: async (ids: string[]) => {
    set({ isLoadingLists: true });
    try {
      const tasks = await Promise.all(
        ids.map((id) => getTaskById(id).then((res) => res.data))
      );
      set({
        tasks: tasks.reverse(),
        isLoadingLists: false,
      });
    } catch (error) {
      set({
        error: ERROR_LOADING_TASKS,
        isLoadingLists: false,
      });
    }
  },

  addTask: async (title: string, description: string, status: TaskType) => {
    const newTask = await postTask(title, description, status);
    set((state) => ({
      tasks: [newTask.data, ...state.tasks],
    }));
  },

  editTask: async (
    id: string,
    title: string,
    description: string,
    status: TaskType
  ) => {
    const updatedTask = await putTask(id, title, description, status);
    console.log(updatedTask);

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, attributes: updatedTask.data.attributes }
          : task
      ),
    }));
  },

  deleteTask: async (id: string) => {
    await deleteTask(id);
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      const favoriteIds = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_FOLDER) || '[]'
      );
      const newFavoriteIds = favoriteIds.filter(
        (favoriteId: string) => favoriteId !== id
      );
      localStorage.setItem(
        LOCAL_STORAGE_FOLDER,
        JSON.stringify(newFavoriteIds)
      );

      return {
        tasks: updatedTasks,
        favoriteIds: newFavoriteIds,
      };
    });
  },
}));

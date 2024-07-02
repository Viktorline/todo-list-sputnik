import { create } from 'zustand';
import { FilterType, TaskOwn, TaskType } from './types';
import {
  postTask,
  getTasks,
  deleteTask,
  putTask,
  getTaskById,
} from '../api/todoApi';

export interface TaskState {
  tasks: TaskOwn[];
  favoriteIds: string[];
  filter: FilterType;
  isLoadingLists: boolean;
  error: string | null;
  setFilter: (filter: FilterType) => void;
  addTask: (title: string, description: string, status: TaskType) => void;
  editTask: (
    id: string,
    title: string,
    description: string,
    status: TaskType
  ) => void;
  fetchTasks: (params: any) => void;
  fetchTasksByIds: (ids: string[]) => void;
  deleteTask: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filter: 'all',
  error: null,
  isLoadingLists: false,
  favoriteIds: JSON.parse(localStorage.getItem('favoriteIds') || '[]'),

  setFilter: (filter: FilterType) => set({ filter }),

  toggleFavorite: (id: string) => {
    set((state) => {
      const isFavorite = state.favoriteIds.includes(id);
      const newFavoriteIds = isFavorite
        ? state.favoriteIds.filter((favId) => favId !== id)
        : [...state.favoriteIds, id];

      localStorage.setItem('favoriteIds', JSON.stringify(newFavoriteIds));

      return { favoriteIds: newFavoriteIds };
    });
  },

  fetchTasks: async (params: any) => {
    set({ isLoadingLists: true, error: null });
    try {
      const newTask = await getTasks(params);
      set({
        tasks: (newTask.data as TaskOwn[]).reverse(),
        isLoadingLists: false,
      });
    } catch (error) {
      set({
        error: 'Ошибка загрузки задач. Попробуйте перезагрузить страницу',
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
        error: 'Ошибка загрузки задач. Попробуйте перезагрузить страницу',
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
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));

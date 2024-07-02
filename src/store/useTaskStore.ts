import { create } from 'zustand';
import { FilterType, TaskOwn, TaskType } from './types';
import { postTask, getTasks, deleteTask, putTask } from '../api/todoApi';

export interface TaskState {
  tasks: TaskOwn[];
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
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filter: 'all',
  error: null,
  isLoadingLists: false,

  setFilter: (filter: FilterType) => set({ filter }),

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
        error: 'Ошибка загрузки сообщений. Попробуйте перезагрузить страницу',
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

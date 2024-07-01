import { create } from 'zustand';
import { FilterType, TaskOwn, TaskType } from './types';
import { postTask, getTasks, deleteTask } from '../api/todoApi';
import mockData from '../mock.json';

export interface TaskState {
  tasks: TaskOwn[];
  isLoading: boolean;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  addTask: (title: string, description: string, status: TaskType) => void;
  fetchTasks: (params: any) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: true,
  filter: 'all',

  setFilter: (filter: FilterType) => set({ filter }),

  fetchTasks: async (params: any) => {
    set({ isLoading: true });
    const newTask = await getTasks(params);

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ tasks: newTask.data as TaskOwn[], isLoading: false });
  },

  addTask: async (title: string, description: string, status: TaskType) => {
    // set({ isLoading: true });
    const newTask = await postTask(title, description, status);

    set((state) => ({
      tasks: [newTask.data, ...state.tasks],
      // isLoading: false,
    }));
  },

  deleteTask: async (id: string) => {
    // set({ isLoading: true });
    await deleteTask(id);

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),

      // isLoading: false,
    }));
  },
}));

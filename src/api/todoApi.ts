import axios from 'axios';
import { TaskType } from '../store/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});

export const getTasks = async (params = {}) => {
  const response = await api.get('/tasks', { params });
  return response.data;
};

export const postTask = async (
  title: string,
  description: string,
  status: TaskType
) => {
  const response = await api.post('/tasks', {
    data: {
      title,
      description,
      status,
    },
  });
  return response.data;
};

export const putTask = async (
  id: string,
  title: string,
  description: string,
  status: TaskType
) => {
  const response = await api.put(`/tasks/${id}`, {
    data: {
      title,
      description,
      status,
    },
  });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

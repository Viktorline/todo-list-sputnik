// import { renderHook, act } from '@testing-library/react';
// import { useTaskStore, TaskState } from './useTaskStore';
// import {
//   postTask,
//   deleteTask,
//   putTask,
//   getTasks,
//   getTaskById,
// } from '../api/todoApi';

// jest.mock('../api/todoApi');

// const mockedPostTask = postTask as jest.MockedFunction<typeof postTask>;

// describe('useTaskStore - postTask', () => {
//   it('fetch postTask and updates the store', async () => {
//     const newTask = {
//       id: '1',
//       attributes: {
//         title: 'Задача',
//         description: 'Описание',
//         status: 'notCompleted',
//       },
//     };

//     mockedPostTask.mockResolvedValue({ data: newTask });

//     const { result } = renderHook(() => useTaskStore());

//     await act(async () => {
//       result.current.addTask('Задача', 'Описание', 'notCompleted');
//     });

//     expect(mockedPostTask).toHaveBeenCalledWith(
//       'Задача',
//       'Описание',
//       'notCompleted'
//     );
//     expect(result.current.tasks).toHaveLength(1);
//     expect(result.current.tasks[0].attributes.title).toBe('Задача');
//   });
// });

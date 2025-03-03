import axiosInstance from './axiosInstance';
import { TODO_API } from './uri';

export const todoService = {
  // 获取所有待办事项
  getTodos: () => {
    return axiosInstance.get(TODO_API.GET_TODOS);
  },

  // 添加待办事项
  addTodo: (todo) => {
    return axiosInstance.post(TODO_API.ADD_TODO, {
      value: todo,
      isCompleted: false
    });
  },

  // 更新待办事项状态
  updateTodo: (id) => {
    return axiosInstance.post(TODO_API.UPDATE_TODO(id));
  },

  // 删除待办事项
  deleteTodo: (id) => {
    return axiosInstance.post(TODO_API.DELETE_TODO(id));
  }
};
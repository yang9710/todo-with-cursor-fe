export const TODO_API = {
  GET_TODOS: '/api/get-todo',
  ADD_TODO: '/api/add-todo',
  UPDATE_TODO: (id) => `/api/update-todo/${id}`,
  DELETE_TODO: (id) => `/api/del-todo/${id}`
};
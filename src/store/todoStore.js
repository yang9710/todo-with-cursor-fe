import { create } from 'zustand';
import { todoService } from '../services/service';

const useTodoStore = create((set, get) => ({
  // 状态
  todos: [],
  loading: false,
  error: null,
  filter: 'all',
  darkMode: false,

  // 计算属性
  filteredTodos: () => {
    const { todos, filter } = get();
    return todos.filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'active') return !todo.isCompleted;
      if (filter === 'completed') return todo.isCompleted;
      return true;
    });
  },

  completionRate: () => {
    const { todos } = get();
    return todos.length > 0
      ? Math.round((todos.filter(todo => todo.isCompleted).length / todos.length) * 100)
      : 0;
  },

  // 操作方法
  setFilter: (filter) => set({ filter }),
  setDarkMode: (darkMode) => set({ darkMode }),

  // 异步操作
  fetchTodos: async () => {
    try {
      set({ loading: true, error: null });
      const data = await todoService.getTodos();
      set({ todos: data });
    } catch (err) {
      set({ error: '获取待办事项时出错: ' + err.message });
      console.error('获取待办事项时出错:', err);
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (value) => {
    try {
      set({ error: null });
      const addedTodo = await todoService.addTodo(value);
      set(state => ({ todos: [...state.todos, addedTodo] }));
      return true;
    } catch (err) {
      set({ error: '添加待办事项时出错: ' + err.message });
      console.error('添加待办事项时出错:', err);
      return false;
    }
  },

  toggleTodo: async (id) => {
    try {
      set({ error: null });
      const updatedTodo = await todoService.updateTodo(id);
      set(state => ({
        todos: state.todos.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      }));
    } catch (err) {
      set({ error: '更新待办事项状态时出错: ' + err.message });
      console.error('更新待办事项状态时出错:', err);
    }
  },

  deleteTodo: async (id) => {
    try {
      set({ error: null });
      await todoService.deleteTodo(id);
      set(state => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }));
    } catch (err) {
      set({ error: '删除待办事项时出错: ' + err.message });
      console.error('删除待办事项时出错:', err);
    }
  }
}));

export default useTodoStore;
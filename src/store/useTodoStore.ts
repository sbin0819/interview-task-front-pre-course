import { create } from 'zustand';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (title: string) =>
    set((state) => {
      const undoneCount = state.todos.filter((todo) => !todo.done).length;

      if (undoneCount >= 10) {
        return state;
      }

      return {
        todos: [...state.todos, { id: Date.now(), title, done: false }],
      };
    }),
  removeTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  toggleTodo: (id: number) =>
    set((state) => {
      const targetTodo = state.todos.find((todo) => todo.id === id);
      if (!targetTodo) return state;

      const undoneCount = state.todos.filter((t) => !t.done).length;

      if (targetTodo.done && undoneCount >= 10) {
        return state;
      }

      return {
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      };
    }),
}));

export const resetStore = () => {
  useTodoStore.setState({ todos: [] });
};

export default useTodoStore;

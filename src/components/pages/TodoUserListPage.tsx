import TodoForm from '../TodoForm';
import TodoList from '../TodoList';

const TodoUserListPage = () => {
  return (
    <div className="flex items-center flex-col">
      <h1 className="mt-20 text-4xl font-bold">To Do List</h1>
      <div className="w-full md:w-[600px]">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default TodoUserListPage;

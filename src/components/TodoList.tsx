'use client';

import Image from 'next/image';
import { useState } from 'react';
import useTodoStore from '../store/useTodoStore';

const tabs = {
  all: 'All',
  todo: 'To Do',
  done: 'Done',
};

type Tab = keyof typeof tabs;

export default function TodoList() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === 'todo') return !todo.done;
    if (activeTab === 'done') return todo.done;
    return true;
  });

  return (
    <div className="mt-10 w-full border border-gray-100 shadow-lg rounded-xl">
      <div className="py-4 flex items-center justify-center">
        {Object.entries(tabs).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as Tab)}
            className={`px-8 py-2 text-center rounded-lg ${
              activeTab === key
                ? 'font-bold text-blue-500 bg-blue-100'
                : 'text-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div key={todo.id} className="flex items-center p-4">
              <div
                className={`flex items-center justify-center border border-gray-400 rounded-full w-[24px] h-[24px] cursor-pointer ${todo.done ? 'bg-blue-400' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.done ? (
                  <Image src="./Check.svg" height={16} width={16} alt="check" />
                ) : null}
              </div>
              <span className="px-2">{todo.title}</span>
              <div
                className="ml-auto cursor-pointer"
                onClick={() => removeTodo(todo.id)}
              >
                <Image src="./Close.svg" height={24} width={24} alt="close" />
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">할 일이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

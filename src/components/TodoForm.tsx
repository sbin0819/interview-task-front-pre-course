'use client';

import React, { useState } from 'react';
import useTodoStore from '../store/useTodoStore';

const TodoForm = () => {
  const [inputValue, setInputValue] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      return;
    }
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="mt-8 py-6 px-4 w-full bg-gray-100 rounded-2xl outline-none"
        placeholder="할 일을 입력해 주세요"
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default TodoForm;

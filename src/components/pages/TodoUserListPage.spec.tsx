import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoUserListPage from './TodoUserListPage';

describe('TodoUserListPage', () => {
  it('renders the heading To Do List', () => {
    render(<TodoUserListPage />);
    const heading = screen.getByRole('heading', { name: /To Do List/i });
    expect(heading).toBeInTheDocument();
  });

  it('form에 글을 쓰고 제출하면 todos가 늘어난다', () => {
    render(<TodoUserListPage />);

    const initialItems = screen.queryAllByTestId('todo-item').length;

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '새로운 할 일' } });
    expect(input.value).toBe('새로운 할 일');

    fireEvent.submit(input.closest('form')!);

    const updatedItems = screen.queryAllByTestId('todo-item');
    expect(updatedItems.length).toBe(initialItems + 1);

    expect(screen.getByText('새로운 할 일')).toBeInTheDocument();
  });
});

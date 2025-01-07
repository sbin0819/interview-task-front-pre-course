import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { resetStore } from '../../store/useTodoStore';
import TodoUserListPage from './TodoUserListPage';

describe('TodoUserListPage', () => {
  beforeEach(() => {
    resetStore();
  });

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

  it('done: false인 할 일이 10개 이상이면 추가되지 않는다', () => {
    render(<TodoUserListPage />);

    expect(screen.queryAllByTestId('todo-item').length).toBe(0);

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;

    for (let i = 1; i <= 10; i++) {
      fireEvent.change(input, { target: { value: `할 일 ${i}` } });
      fireEvent.submit(input.closest('form')!);
    }

    expect(screen.queryAllByTestId('todo-item').length).toBe(10);

    fireEvent.change(input, { target: { value: '할 일 11' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.queryAllByTestId('todo-item').length).toBe(10);

    expect(screen.queryByText('할 일 11')).toBeNull();
  });

  it('done: true로 변경된 후, 새로운 할 일이 추가 가능하다', () => {
    render(<TodoUserListPage />);

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;

    for (let i = 1; i <= 10; i++) {
      fireEvent.change(input, { target: { value: `할 일 ${i}` } });
      fireEvent.submit(input.closest('form')!);
    }

    expect(screen.queryAllByTestId('todo-item').length).toBe(10);

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox); // toggleTodo 호출

    fireEvent.change(input, { target: { value: '새로운 할 일' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.queryAllByTestId('todo-item').length).toBe(11);
    expect(screen.getByText('새로운 할 일')).toBeInTheDocument();
  });
});

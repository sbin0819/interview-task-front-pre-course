import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';
import useTodoStore, { resetStore } from '../store/useTodoStore';

describe('TodoList (real Zustand store)', () => {
  beforeEach(() => {
    resetStore();
  });

  it('렌더링 시 기본적으로 todos가 없으므로 "할 일이 없습니다." 문구가 뜬다', () => {
    render(<TodoList />);

    expect(screen.getByText('할 일이 없습니다.')).toBeInTheDocument();
  });

  it('필터 버튼(ALL / To Do / Done)이 모두 표시된다', () => {
    render(<TodoList />);

    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /To Do/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Done/i })).toBeInTheDocument();
  });

  it('ALL 탭에서, store에 todos가 있으면 모두 렌더링된다', () => {
    useTodoStore.setState({
      todos: [
        { id: 1, title: 'Task 1', done: false },
        { id: 2, title: 'Task 2', done: true },
      ],
    });

    render(<TodoList />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('To Do 탭을 누르면 done=false 인 것만 표시된다', () => {
    useTodoStore.setState({
      todos: [
        { id: 1, title: 'Task 1', done: false },
        { id: 2, title: 'Task 2', done: true },
      ],
    });

    render(<TodoList />);

    fireEvent.click(screen.getByRole('button', { name: /To Do/i }));

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).toBeNull();
  });

  it('Done 탭을 누르면 done=true 인 것만 표시된다', () => {
    useTodoStore.setState({
      todos: [
        { id: 1, title: 'Task 1', done: false },
        { id: 2, title: 'Task 2', done: true },
      ],
    });

    render(<TodoList />);

    fireEvent.click(screen.getByRole('button', { name: /Done/i }));

    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).toBeNull();
  });

  it('Close 아이콘 클릭 시 removeTodo로 아이템이 제거된다', () => {
    useTodoStore.setState({
      todos: [
        { id: 1, title: 'Task 1', done: false },
        { id: 2, title: 'Task 2', done: true },
      ],
    });

    render(<TodoList />);

    const closeIcons = screen.getAllByAltText('close');
    expect(closeIcons).toHaveLength(2);

    fireEvent.click(closeIcons[0]);

    expect(screen.queryByText('Task 1')).toBeNull();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('체크박스 부분을 클릭하면 toggleTodo가 작동하여 done 상태가 변경된다', () => {
    useTodoStore.setState({
      todos: [{ id: 1, title: 'Task 1', done: false }],
    });

    render(<TodoList />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(checkbox);

    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });
});

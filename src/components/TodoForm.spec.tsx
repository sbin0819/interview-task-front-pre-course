import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import useTodoStore from '../store/useTodoStore';
import TodoForm from './TodoForm';

jest.mock('../store/useTodoStore');

describe('TodoForm', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    (useTodoStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        addTodo: mockAddTodo,
      };
      return selector(state);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('placeholder가 "할 일을 입력해 주세요" 인 input을 렌더링한다', () => {
    render(<TodoForm />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
  });

  it('input에 텍스트를 입력하고, form을 제출하면 addTodo가 호출된다', () => {
    render(<TodoForm />);

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;
    const testValue = '테스트 할 일';

    fireEvent.change(input, { target: { value: testValue } });
    expect(input.value).toBe(testValue);

    fireEvent.submit(input.closest('form')!);

    expect(mockAddTodo).toHaveBeenCalledWith(testValue);
    expect(mockAddTodo).toHaveBeenCalledTimes(1);

    expect(input.value).toBe('');
  });

  it('빈 문자열만 입력하면 addTodo가 호출되지 않는다', () => {
    render(<TodoForm />);

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;
    fireEvent.submit(input.closest('form')!);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TodoUserListPage from './TodoUserListPage';

describe('TodoUserListPage', () => {
  it('renders the heading To Do List', () => {
    render(<TodoUserListPage />);

    const heading = screen.getByRole('heading', { name: /To Do List/i });
    expect(heading).toBeInTheDocument();
  });
});

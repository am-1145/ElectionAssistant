import { render, screen } from '@testing-library/react';
import App from '../App';
import { AppProvider } from '../context/AppContext';

// Mock matchMedia to prevent errors with Framer Motion or Tailwind
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App', () => {
  it('renders the main dashboard heading', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );
    expect(screen.getByText(/Election Assistant/i)).toBeInTheDocument();
  });
});

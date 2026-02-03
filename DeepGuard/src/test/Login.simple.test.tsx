import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import Login from '@/pages/Login';

describe('Login Component - Simple Tests', () => {
  it('should render login form', () => {
    render(<Login />);
    
    expect(screen.getByText('Welcome to DeepGuard AI')).toBeInTheDocument();
  });

  it('should have email and password inputs', () => {
    render(<Login />);
    
    const emailInputs = screen.getAllByPlaceholderText(/email/i);
    const passwordInputs = screen.getAllByPlaceholderText(/password/i);
    
    expect(emailInputs.length).toBeGreaterThan(0);
    expect(passwordInputs.length).toBeGreaterThan(0);
  });

  it('should have submit button', () => {
    render(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should have link to signup page', () => {
    render(<Login />);
    
    const signupText = screen.getByText(/sign up/i);
    expect(signupText).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    const { container } = render(<Login />);
    expect(container).toBeTruthy();
  });
});

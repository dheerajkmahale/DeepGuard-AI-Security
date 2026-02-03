import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext - Simple Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with no user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should login user successfully', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeTruthy();
    expect(result.current.user?.email).toBe('test@example.com');
  });

  it('should signup user successfully', async () => {
    const { result} = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.signup('john@example.com', 'password123', 'John Doe');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeTruthy();
    expect(result.current.user?.email).toBe('john@example.com');
    expect(result.current.user?.name).toBe('John Doe');
  });

  it('should logout user successfully', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // First login
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    
    // Then logout
    await act(async () => {
      await result.current.logout();
    });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should persist user data in localStorage', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    const stored = localStorage.getItem('deepguard_user');
    expect(stored).toBeTruthy();
    
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.email).toBe('test@example.com');
    }
  });

  it('should maintain user data after login', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // First login
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    // User data should persist
    expect(result.current.user).toBeTruthy();
    expect(result.current.isAuthenticated).toBe(true);
  });
});

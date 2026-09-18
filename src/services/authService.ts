// Authentication service for Admin login

const ADMIN_STORAGE_KEY = 'ethio_admin_auth_token';

export const AuthService = {
  login(username: string, password: string): boolean {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanUser === 'lalion' && cleanPass === '157394') {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({
        username: 'lalion',
        role: 'SUPER_ADMIN',
        loginTime: new Date().toISOString(),
      }));
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  },

  isAuthenticated(): boolean {
    try {
      const data = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (!data) return false;
      const parsed = JSON.parse(data);
      return parsed && parsed.username === 'lalion';
    } catch {
      return false;
    }
  },

  getCurrentUser(): { username: string; role: string } | null {
    try {
      const data = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },
};

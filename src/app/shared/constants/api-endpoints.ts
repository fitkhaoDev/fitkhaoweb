export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    LOGOUT: 'auth/logout',
    REFRESH_TOKEN: 'auth/refresh'
  },
  USERS: {
    BASE: 'users',
    BY_ID: (id: string) => `users/${id}`,
    PROFILE: 'users/profile'
  }
};

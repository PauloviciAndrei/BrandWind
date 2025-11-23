const BASE_URL = import.meta.env.VITE_BASE_URL;

export const BACKEND_HOST = BASE_URL.replace(/\/api\/?$/, '');

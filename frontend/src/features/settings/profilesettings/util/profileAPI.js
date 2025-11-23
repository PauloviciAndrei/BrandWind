import API from '../../../../utils/API/api';
const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

export const getProfile = async () => {
  if (DEMO) {
    return {
      _id: 'demo-user-id',
      email: 'demo@example.com',
      password: undefined,
      name: 'Demo User',
      title: 'Frontend Preview',
      location: 'Demo City',
      about: 'This is demo mode. No backend is required.',
      language: 'English',
      timezone: 'UTC+02:00',
      photo: null,
      lastActive: new Date().toISOString(),
      roleID: null,
      teamID: 'demo-team-1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };
  }

  const response = await API.get('/users/me');
  return response.data;
};

export const updateProfile = async (data) => {
  if (DEMO) {
    return {
      ...data,
      updatedAt: new Date().toISOString(),
    };
  }

  const response = await API.put('/users/me', data);
  return response.data;
};

export const updateProfilePhoto = async (file) => {
  if (DEMO) {
    return {
      photo: URL.createObjectURL(file),
      updatedAt: new Date().toISOString(),
    };
  }

  const formData = new FormData();
  formData.append('photo', file);

  const response = await API.put('/users/me/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

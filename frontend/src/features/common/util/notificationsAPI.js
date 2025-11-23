import API from '../../../utils/API/api';

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

let demoNotifications = [
  {
    _id: 'notif-1',
    message: 'Your monthly report is ready!',
    seen: false,
    userId: 'demo-user',
    date: '2025-02-12T10:23:00.000Z',
  },
  {
    _id: 'notif-2',
    message: 'New transaction of $120.50 has been added.',
    seen: false,
    userId: 'demo-user',
    date: '2025-02-11T08:17:00.000Z',
  },
  {
    _id: 'notif-3',
    message: 'Password changed successfully.',
    seen: true,
    userId: 'demo-user',
    date: '2025-02-09T14:02:00.000Z',
  },
  {
    _id: 'notif-4',
    message: 'Your profile was updated.',
    seen: true,
    userId: 'demo-user',
    date: '2025-02-05T18:45:00.000Z',
  },
];

export const fetchNotificationsAPI = async () => {
  if (DEMO) {
    return [...demoNotifications];
  }

  const response = await API.get('/notifications');
  return response.data;
};

export const markAsSeenAPI = async (id) => {
  if (DEMO) {
    const notifIndex = demoNotifications.findIndex((n) => n._id === id);

    if (notifIndex !== -1) {
      demoNotifications[notifIndex] = {
        ...demoNotifications[notifIndex],
        seen: true,
      };

      return demoNotifications[notifIndex];
    }

    return null;
  }

  const response = await API.put(`/notifications/${id}`, { seen: true });
  return response.data;
};

export const createNotificationAPI = async (notification) => {
  const response = await API.post('/notifications', notification);
  return response.data;
};

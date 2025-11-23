import API from '../../../utils/API/api';

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

const transactionsAPI = {
  getAllTransactions: async ({ startDate, endDate, status } = {}) => {
    try {
      if (DEMO) {
        let demoData = [
          {
            _id: 'txn-1',
            photo: null,
            name: 'John Doe',
            email: 'john@example.com',
            location: 'New York, USA',
            amount: 120.5,
            date: '2024-02-05T10:45:00.000Z',
            userId: 'demo-user',
            status: 'paid',
          },
          {
            _id: 'txn-2',
            photo: null,
            name: 'Emily Smith',
            email: 'emily@example.com',
            location: 'Berlin, Germany',
            amount: 89.99,
            date: '2024-02-10T14:20:00.000Z',
            userId: 'demo-user',
            status: 'paid',
          },
          {
            _id: 'txn-3',
            photo: null,
            name: 'Carlos Rodrigues',
            email: 'carlos@example.com',
            location: 'São Paulo, Brazil',
            amount: 249.0,
            date: '2024-01-28T08:30:00.000Z',
            userId: 'demo-user',
            status: 'pending',
          },
          {
            _id: 'txn-4',
            photo: null,
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            location: 'London, UK',
            amount: 56.75,
            date: '2024-02-01T12:10:00.000Z',
            userId: 'demo-user',
            status: 'paid',
          },
          {
            _id: 'txn-5',
            photo: null,
            name: 'Ahmed Khan',
            email: 'ahmed@example.com',
            location: 'Dubai, UAE',
            amount: 310.0,
            date: '2024-01-15T09:05:00.000Z',
            userId: 'demo-user',
            status: 'pending',
          },
        ];

        if (status) {
          demoData = demoData.filter((t) => t.status === status.toLowerCase());
        }

        return demoData;
      }
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (status) params.status = status;

      const response = await API.get('/transactions', { params });
      return response.data;
    } catch (err) {
      throw err.response?.data || new Error('Network Error');
    }
  },
};

export default transactionsAPI;

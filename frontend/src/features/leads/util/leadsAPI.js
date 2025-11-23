import API from '../../../utils/API/api';
const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

// Fetch all leads
export const fetchLeads = async () => {
  if (DEMO) {
    return [
      {
        _id: 'demo-1',
        email: 'maria.johnson@example.com',
        photo: null,
        firstName: 'Maria',
        lastName: 'Johnson',
        status: 'Open',
        assignedTo: 'Daniel Carter',
        userId: 'demo-user-id1',
        createdAt: '2024-01-05T10:15:01Z',
        updatedAt: '2024-01-05T10:15:00Z',
      },
      {
        _id: 'demo-2',
        email: 'devon.smith@example.com',
        photo: null,
        firstName: 'Devon',
        lastName: 'Smith',
        status: 'Not Interested',
        assignedTo: 'Emily Davis',
        userId: 'demo-user-id2',
        createdAt: '2024-01-08T14:20:00Z',
        updatedAt: '2024-01-08T14:20:00Z',
      },
      {
        _id: 'demo-3',
        email: 'julia.martin@example.com',
        photo: null,
        firstName: 'Julia',
        lastName: 'Martin',
        status: 'Sold',
        assignedTo: 'Michael Brown',
        userId: 'demo-user-id3',
        createdAt: '2024-01-12T09:45:00Z',
        updatedAt: '2024-01-12T09:45:00Z',
      },
      {
        _id: 'demo-4',
        email: 'thomas.lee@example.com',
        photo: null,
        firstName: 'Thomas',
        lastName: 'Lee',
        status: 'In Progress',
        assignedTo: 'Sarah Kim',
        userId: 'demo-user-id4',
        createdAt: '2024-01-14T16:30:00Z',
        updatedAt: '2024-01-14T16:30:00Z',
      },
      {
        _id: 'demo-5',
        email: 'john.smith@example.com',
        photo: null,
        firstName: 'John',
        lastName: 'Smith',
        status: 'Need Followup',
        assignedTo: 'Chris Brown',
        userId: 'demo-user-id5',
        createdAt: '2024-01-14T16:30:00Z',
        updatedAt: '2024-01-14T16:30:00Z',
      },
    ];
  }

  const res = await API.get('/leads');
  return res.data;
};

// Add new lead
export const createLead = async (leadData) => {
  if (DEMO === true) {
    return {
      _id: crypto.randomUUID(),
      email: leadData.email || '',
      photo: null,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      status: leadData.status || 'New',
      assignedTo: leadData.assignedTo || 'Unassigned',
      userId: 'demo-user-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const res = await API.post('/leads', leadData);
  return res.data;
};

// Delete lead
export const deleteLeadById = async (id) => {
  const res = await API.delete(`/leads/${id}`);
  return res.data;
};

// Update lead
export const updateLead = async (id, leadData) => {
  const res = await API.put(`/leads/${id}`, leadData);
  return res.data;
};

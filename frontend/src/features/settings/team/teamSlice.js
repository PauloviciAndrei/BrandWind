import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/API/api';

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

export const fetchTeamMembers = createAsyncThunk(
  'team/fetchTeamMembers',
  async (teamId, { rejectWithValue }) => {
    try {
      if (DEMO) {
        // Return demo team members
        return [
          {
            _id: 'demo-member-1',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            photo: null,
            createdAt: '2024-01-02T10:00:00Z',
            lastActive: new Date().toISOString(),
            roleID: { role: 'Owner' },
            teamID: teamId,
          },
          {
            _id: 'demo-member-2',
            name: 'Mark Thompson',
            email: 'mark@example.com',
            photo: null,
            createdAt: '2024-01-05T08:15:00Z',
            lastActive: new Date().toISOString(),
            roleID: { role: 'Admin' },
            teamID: teamId,
          },
          {
            _id: 'demo-member-3',
            name: 'Emily Carter',
            email: 'emily@example.com',
            photo: null,
            createdAt: '2024-01-10T09:45:00Z',
            lastActive: new Date().toISOString(),
            roleID: { role: 'Manager' },
            teamID: teamId,
          },
          {
            _id: 'demo-member-4',
            name: 'Jason Lee',
            email: 'jason@example.com',
            photo: null,
            createdAt: '2024-01-12T14:30:00Z',
            lastActive: new Date().toISOString(),
            roleID: { role: 'Support' },
            teamID: teamId,
          },
        ];
      }

      const response = await API.get(`/users?teamId=${teamId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTeamMember: (state, action) => {
      state.members.push(action.payload);
    },
    removeTeamMember: (state, action) => {
      state.members.splice(action.payload, 1);
    },
    updateTeamMember: (state, action) => {
      const { index, updatedMember } = action.payload;
      state.members[index] = updatedMember;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTeamMember, removeTeamMember, updateTeamMember } =
  teamSlice.actions;
export default teamSlice.reducer;

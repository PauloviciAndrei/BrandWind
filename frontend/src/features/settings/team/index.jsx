import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { openModal } from '../../common/modalSlice';
import {
  MODAL_BODY_TYPES,
  CONFIRMATION_MODAL_CLOSE_TYPES,
} from '../../../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { fetchTeamMembers } from './teamSlice';
import { fetchCurrentUser } from '../../user/slices/authSlice';
import { getPhotoUrl } from '../../../utils/API/getPhotoURL';

function Team() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const teamId = currentUser?.teamID;
  const { members, loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    if (!currentUser) dispatch(fetchCurrentUser());
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (teamId) dispatch(fetchTeamMembers(teamId));
  }, [dispatch, teamId]);

  const getRoleComponent = (role) => {
    if (role === 'Admin')
      return <div className="badge badge-secondary">{role}</div>;
    if (role === 'Manager') return <div className="badge">{role}</div>;
    if (role === 'Owner')
      return <div className="badge badge-primary">{role}</div>;
    if (role === 'Support')
      return <div className="badge badge-accent">{role}</div>;
    return <div className="badge badge-ghost">{role}</div>;
  };

  const deleteCurrentMember = (index) => {
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to remove this team member?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TEAM_DELETE,
          index,
        },
      })
    );
  };

  if (!teamId) return <div>Team not found for current user</div>;
  if (loading) return <div>Loading members...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TitleCard title="Active Members" topMargin="mt-2">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Joined On</th>
              <th>Role</th>
              <th>Last Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, k) => (
              <tr key={k}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img
                          src={getPhotoUrl(m.photo)}
                          alt={m.name || 'Avatar'}
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{m.name}</div>
                    </div>
                  </div>
                </td>
                <td>{m.email}</td>
                <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                <td>{getRoleComponent(m.roleID?.role)}</td>
                <td>
                  {m.lastActive
                    ? new Date(m.lastActive).toLocaleString()
                    : 'N/A'}
                </td>
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => deleteCurrentMember(k)}
                  >
                    <TrashIcon className="w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default Team;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import Team from '../../features/settings/team';
import { fetchCurrentUser } from '../../features/user/slices/authSlice';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Team Members' }));
    dispatch(fetchCurrentUser());
  }, []);

  return <Team />;
}

export default InternalPage;

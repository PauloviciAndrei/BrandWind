import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
} from '../../features/settings/profilesettings/profileSlice';
import { getProfile } from '../../features/settings/profilesettings/util/profileAPI';
import ProfileSettings from '../../features/settings/profilesettings';

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Settings' }));

    const fetchProfile = async () => {
      dispatch(fetchProfileStart());
      try {
        const data = await getProfile();
        dispatch(fetchProfileSuccess(data));
      } catch (err) {
        dispatch(
          fetchProfileFailure(err.response?.data?.message || err.message)
        );
      }
    };

    fetchProfile();
  }, [dispatch]);

  return <ProfileSettings />;
}

export default InternalPage;

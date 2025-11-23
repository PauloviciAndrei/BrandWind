import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { showNotification } from '../../common/headerSlice';
import InputText from '../../../components/Input/InputText';
import TextAreaInput from '../../../components/Input/TextAreaInput';
import ToogleInput from '../../../components/Input/ToogleInput';
import SelectInput from '../../../components/Input/SelectInput';
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} from './profileSlice';
import {
  updateProfile as updateProfileAPI,
  updateProfilePhoto as updateProfilePhotoAPI,
} from './util/profileAPI';
import { getPhotoUrl } from '../../../utils/API/getPhotoURL';

function ProfileSettings() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [form, setForm] = useState({});

  const languages = [
    'Russian',
    'English',
    'Portuguese',
    'Bengali',
    'Hindi',
    'Mandarin Chinese',
    'Spanish',
    'French',
    'Arabic',
    'Japanese',
    'Urdu',
    'Telugu',
    'Chinese',
    'German',
    'Indonesian',
  ];
  const timezones = [
    'UTC−12:00',
    'UTC−11:00',
    'UTC−10:00',
    'UTC−09:30',
    'UTC−09:00',
    'UTC−08:00',
    'UTC−07:00',
    'UTC−06:00',
    'UTC−05:00',
    'UTC−04:00',
    'UTC−03:30',
    'UTC−03:00',
    'UTC−02:00',
    'UTC−01:00',
    'UTC±00:00',
    'UTC+01:00',
    'UTC+02:00',
    'UTC+03:00',
    'UTC+03:30',
    'UTC+04:00',
    'UTC+04:30',
    'UTC+05:00',
    'UTC+05:30',
    'UTC+05:45',
    'UTC+06:00',
    'UTC+06:30',
    'UTC+07:00',
    'UTC+08:00',
    'UTC+08:45',
    'UTC+09:00',
    'UTC+09:30',
    'UTC+10:00',
    'UTC+10:30',
    'UTC+11:00',
    'UTC+12:00',
    'UTC+12:45',
    'UTC+13:00',
    'UTC+14:00',
  ];

  useEffect(() => {
    if (profile) {
      setForm(profile);
    }
  }, [profile]);

  const updateFormValue = ({ updateType, value }) => {
    setForm((prev) => ({ ...prev, [updateType]: value }));
  };

  const updateProfileHandler = async () => {
    dispatch(updateProfileStart());

    try {
      const formData = { ...form };
      if (formData.profilePhoto) delete formData.profilePhoto;

      const updatedData = await updateProfileAPI(formData);
      dispatch(updateProfileSuccess(updatedData));
      dispatch(showNotification({ message: 'Profile Updated', status: 1 }));
    } catch (err) {
      dispatch(
        updateProfileFailure(err.response?.data?.message || err.message)
      );
      dispatch(
        showNotification({ message: 'Profile update failed', status: 0 })
      );
    }
  };

  const updateProfilePhotoHandler = async (file) => {
    if (!file) return;
    dispatch(updateProfileStart());

    try {
      const updatedData = await updateProfilePhotoAPI(file);
      setForm((prev) => ({
        ...prev,
        photo: updatedData.photo,
        profilePhoto: null,
      }));
      dispatch(updateProfileSuccess({ ...profile, photo: updatedData.photo }));
      dispatch(
        showNotification({ message: 'Profile photo updated', status: 1 })
      );
    } catch (err) {
      dispatch(
        updateProfileFailure(err.response?.data?.message || err.message)
      );
      dispatch(showNotification({ message: 'Photo update failed', status: 0 }));
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <TitleCard title="Profile Settings" topMargin="mt-2">
      <div className="flex items-center space-x-6 mb-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring-3 ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={
                form.profilePhoto instanceof File
                  ? URL.createObjectURL(form.profilePhoto)
                  : getPhotoUrl(form.photo)
              }
              alt="Profile"
            />
          </div>
        </div>
        <div>
          <label className="btn btn-primary">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                updateFormValue({ updateType: 'profilePhoto', value: file });
                updateProfilePhotoHandler(file);
              }}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputText
          labelTitle="Name"
          value={form.name}
          updateFormValue={updateFormValue}
          updateType="name"
        />
        <InputText
          labelTitle="Email Id"
          value={form.email}
          updateFormValue={updateFormValue}
          updateType="email"
        />
        <InputText
          labelTitle="Title"
          value={form.title}
          updateFormValue={updateFormValue}
          updateType="title"
        />
        <InputText
          labelTitle="Place"
          value={form.location}
          updateFormValue={updateFormValue}
          updateType="location"
        />
        <TextAreaInput
          labelTitle="About"
          value={form.about}
          updateFormValue={updateFormValue}
          updateType="about"
        />
      </div>

      <div className="divider"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          labelTitle="Language"
          value={form.language}
          options={languages}
          updateType="language"
          updateFormValue={updateFormValue}
        />
        <SelectInput
          labelTitle="Timezone"
          value={form.timezone}
          options={timezones}
          updateType="timezone"
          updateFormValue={updateFormValue}
        />
        <ToogleInput
          updateType="syncData"
          labelTitle="Sync Data"
          value={form.syncData ?? true}
          updateFormValue={updateFormValue}
        />
      </div>

      <div className="mt-16">
        <button
          className="btn btn-primary float-right"
          onClick={updateProfileHandler}
        >
          Update
        </button>
      </div>
    </TitleCard>
  );
}

export default ProfileSettings;

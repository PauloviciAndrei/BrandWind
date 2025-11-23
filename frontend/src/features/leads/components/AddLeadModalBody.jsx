import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { addLeadAsync } from '../leadSlice';
import { STATUS_OPTIONS } from '../util/util';
import SelectInput from '../../../components/Input/SelectInput';
import { createLead } from '../util/leadsAPI';
import { getProfile } from '../../settings/profilesettings/util/profileAPI';

const INITIAL_LEAD_OBJ = {
  first_name: '',
  last_name: '',
  email: '',
  status: 'Open',
  assigned_to: '',
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.first_name.trim() === '')
      return setErrorMessage('First Name is required!');
    if (leadObj.last_name.trim() === '')
      return setErrorMessage('Last Name is required!');
    if (leadObj.email.trim() === '')
      return setErrorMessage('Email id is required!');

    try {
      setLoading(true);
      setErrorMessage('');

      const profile = await getProfile();

      const payload = {
        firstName: leadObj.first_name,
        lastName: leadObj.last_name,
        email: leadObj.email,
        status: leadObj.status,
        assignedTo: leadObj.assigned_to,
        userId: profile._id,
      };

      await dispatch(addLeadAsync(payload)).unwrap();

      dispatch(showNotification({ message: 'New Lead Added!', status: 1 }));
      closeModal();
    } catch (err) {
      console.error('Failed to create lead', err);
      setErrorMessage('Failed to create lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <div className="space-y-2 text-sm">
      <InputText
        type="text"
        value={leadObj.first_name}
        updateType="first_name"
        containerStyle="mt-2 h-18"
        labelTitle="First Name"
        updateFormValue={updateFormValue}
        inputClass="input input-sm"
        labelClass="label-text-sm"
      />

      <InputText
        type="text"
        value={leadObj.last_name}
        updateType="last_name"
        containerStyle="mt-2 h-18"
        labelTitle="Last Name"
        updateFormValue={updateFormValue}
        inputClass="input input-sm"
        labelClass="label-text-sm"
      />

      <InputText
        type="email"
        value={leadObj.email}
        updateType="email"
        containerStyle="mt-2 h-18"
        labelTitle="Email Id"
        updateFormValue={updateFormValue}
      />

      <div className="mt-2">
        <SelectInput
          labelTitle="Status"
          options={STATUS_OPTIONS.map((s) => s.value)}
          value={leadObj.status}
          updateType="status"
          updateFormValue={updateFormValue}
          openDirection="up"
        />
      </div>

      <InputText
        type="text"
        value={leadObj.assigned_to}
        updateType="assigned_to"
        containerStyle="mt-2 h-18"
        labelTitle="Assigned To"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-4 text-xs">{errorMessage}</ErrorText>

      <div className="modal-action mt-2 space-x-2">
        <button
          className="btn btn-ghost btn-sm px-4 py-1 text-sm"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary btn-sm px-4 py-1 text-sm"
          onClick={() => saveNewLead()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddLeadModalBody;

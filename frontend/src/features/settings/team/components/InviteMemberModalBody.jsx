import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../../components/Input/InputText';
import ErrorText from '../../../../components/Typography/ErrorText';
import { addTeamMember } from '../teamSlice';
import SelectInput from '../../../../components/Input/SelectInput';
import moment from 'moment';
import { showNotification } from '../../../common/headerSlice';

const INITIAL_MEMBER = {
  name: '',
  email: '',
  role: 'Support',
};

function AddTeamMemberModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [memberObj, setMemberObj] = useState(INITIAL_MEMBER);
  const [errorMessage, setErrorMessage] = useState('');

  const saveNewMember = () => {
    if (memberObj.name.trim() === '')
      return setErrorMessage('Name is required!');
    else if (memberObj.email.trim() === '')
      return setErrorMessage('Email is required!');
    else {
      let newMember = {
        ...memberObj,
        avatar: `https://i.pravatar.cc/150?u=${memberObj.email}`,
        joinedOn: moment(new Date()).format('DD MMM YYYY'),
        lastActive: 'just now',
      };
      dispatch(addTeamMember(newMember));
      dispatch(
        showNotification({ message: 'New Team Member Added!', status: 1 })
      );
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setMemberObj({ ...memberObj, [updateType]: value });
  };

  return (
    <div className="space-y-2 text-sm">
      <InputText
        type="text"
        value={memberObj.name}
        updateType="name"
        containerStyle="mt-2 h-18"
        labelTitle="Full Name"
        updateFormValue={updateFormValue}
        inputClass="input input-sm"
        labelClass="label-text-sm"
      />

      <InputText
        type="email"
        value={memberObj.email}
        updateType="email"
        containerStyle="mt-2 h-18"
        labelTitle="Email Id"
        updateFormValue={updateFormValue}
      />

      <div className="mt-2">
        <SelectInput
          labelTitle="Role"
          options={['Owner', 'Admin', 'Manager', 'Support']}
          value={memberObj.role}
          updateType="role"
          updateFormValue={updateFormValue}
          openDirection="up"
        />
      </div>

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
          onClick={saveNewMember}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddTeamMemberModalBody;

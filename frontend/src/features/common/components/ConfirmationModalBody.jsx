import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil';
import { deleteLeadAsync } from '../../leads/leadSlice';
import { showNotification } from '../headerSlice';

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, _id } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
      try {
        await dispatch(deleteLeadAsync(_id)).unwrap();
        dispatch(showNotification({ message: 'Lead Deleted!', status: 1 }));
      } catch (err) {
        console.error('Failed to delete lead:', err);
        dispatch(
          showNotification({ message: 'Failed to delete lead.', status: 0 })
        );
      }
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;

import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../components/Cards/TitleCard';
import { openModal } from '../common/modalSlice';
import { deleteLeadAsync, getLeadsContent } from './leadSlice';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { showNotification } from '../common/headerSlice';
import { STATUS_OPTIONS } from './util/util';
import { getThemeAvatar } from '../../utils/avatars/getThemeAvatar';

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: 'Add New Lead',
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const { leads, isLoading } = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeadsContent());
  }, [dispatch]);

  const renderStatusBadge = (status) => {
    const option = STATUS_OPTIONS.find((s) => s.value === status);
    return <div className={option?.className || 'badge'}>{status}</div>;
  };

  const deleteCurrentLead = (_id) => {
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          _id,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Leads"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => {
                return (
                  <tr key={`${l.id || 'temp'}-${l.email}`}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={getThemeAvatar(l.avatar)} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.firstName}</div>
                          <div className="text-sm opacity-50">{l.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.email}</td>
                    <td>{moment(l.createdAt).format('DD MMM YY')}</td>
                    <td>{renderStatusBadge(l.status)}</td>
                    <td>{l.assignedTo}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(l._id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;

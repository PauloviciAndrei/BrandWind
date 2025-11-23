import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../common/headerSlice';
import TitleCard from '../../components/Cards/TitleCard';
import { RECENT_TRANSACTIONS } from '../../utils/dummyData';
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import SearchBar from '../../components/Input/SearchBar';
import { useLocation } from 'react-router-dom';
import { fetchTransactions } from './transactionsSlice';
import { getThemeAvatar } from '../../utils/avatars/getThemeAvatar';

const TopSideButtons = ({
  removeFilter,
  applyFilter,
  applySearch,
  statusFilter,
  removeStatusFilter,
  locationFilters,
}) => {
  const [filterParam, setFilterParam] = useState('');
  const [searchText, setSearchText] = useState('');

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam('');
    setSearchText('');
  };

  useEffect(() => {
    if (searchText == '') {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="flex items-center justify-end space-x-2">
      {statusFilter && (
        <button
          onClick={removeStatusFilter}
          className="btn btn-xs mr-2 btn-warning normal-case"
        >
          Remove Status Filter
        </button>
      )}
      <SearchBar
        searchText={searchText}
        styleClass="w-48"
        setSearchText={setSearchText}
      />
      {filterParam != '' && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-sm btn-outline flex items-centers"
        >
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow-sm bg-base-100 rounded-box w-52 z-50"
        >
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

function Transactions() {
  const dispatch = useDispatch();
  const location = useLocation();

  const startDate = location.state?.startDate || null;
  const endDate = location.state?.endDate || null;

  const {
    data: allTransactions = [],
    loading,
    error,
  } = useSelector((state) => state.transactions);

  const [trans, setTrans] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterParam, setFilterParam] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);

  const initialStatusFilter = location.state?.statusFilter || null;
  const uniqueLocations = Array.from(
    new Set((allTransactions || []).map((t) => t.location))
  );

  useEffect(() => {
    const params = {};
    if (startDate) params.startDate = new Date(startDate).toISOString();
    if (endDate) params.endDate = new Date(endDate).toISOString();
    if (statusFilter) params.status = statusFilter;

    dispatch(fetchTransactions(params));
  }, [dispatch, startDate, endDate, statusFilter]);

  useEffect(() => {
    if (!loading && allTransactions.length > 0) {
      applyFilters(searchText, filterParam, statusFilter);
    }
  }, [allTransactions]);

  useEffect(() => {
    if (initialStatusFilter) {
      setStatusFilter(initialStatusFilter);
      applyFilters(searchText, filterParam, initialStatusFilter);
    }
  }, [initialStatusFilter]);

  const applyFilters = (search, filter, status = null) => {
    let filteredTransactions = allTransactions;

    if (filter) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.location === filter
      );
    }

    if (search) {
      filteredTransactions = filteredTransactions.filter((t) =>
        t.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.status?.toLowerCase() === status.toLowerCase()
      );
    }

    setTrans(filteredTransactions);
  };

  const applyFilter = (param) => {
    setFilterParam(param);
    applyFilters(searchText, param, statusFilter);
  };

  const applySearch = (value) => {
    setSearchText(value);
    applyFilters(value, filterParam, statusFilter);
  };

  const removeFilter = () => {
    setSearchText('');
    setFilterParam('');
    setStatusFilter(null);
    setTrans(allTransactions);
  };

  const removeStatusFilter = () => {
    setStatusFilter(null);
    setTrans(allTransactions);
    applyFilters(searchText, filterParam, null);
  };

  return (
    <>
      <TitleCard
        title="Recent Transactions"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
            statusFilter={statusFilter}
            removeStatusFilter={removeStatusFilter}
            locationFilters={uniqueLocations}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Transaction Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-8">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={getThemeAvatar(l.avatar)} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.email}</td>
                    <td>{l.location}</td>
                    <td>${l.amount}</td>
                    <td>{moment(l.date).format('D MMM')}</td>
                    <td>
                      <span
                        className={`badge ${
                          l.status === 'paid'
                            ? 'badge-success'
                            : 'badge-primary'
                        }`}
                      >
                        {(l.status || '').toString().toUpperCase()}
                      </span>
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

export default Transactions;

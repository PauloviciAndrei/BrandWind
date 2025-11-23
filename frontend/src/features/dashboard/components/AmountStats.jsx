import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AmountStats({ startDate, endDate }) {
  const navigate = useNavigate();

  const { pendingAmount, paidAmount } = useSelector((state) => state.dashboard);

  const handleViewUsers = () => {
    navigate('/app/transactions', {
      state: { statusFilter: 'pending', startDate, endDate },
    });
  };

  const handleViewMembers = () => {
    navigate('/app/transactions', {
      state: { statusFilter: 'paid', startDate, endDate },
    });
  };

  return (
    <div className="stats bg-base-100 shadow-sm">
      <div className="stat">
        <div className="stat-title">Amount to be Collected</div>
        <div className="stat-value">
          ${(pendingAmount || 0).toLocaleString()}
        </div>
        <div className="stat-actions">
          <button className="btn btn-xs" onClick={handleViewUsers}>
            View Users
          </button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Cash in hand</div>
        <div className="stat-value">${(paidAmount || 0).toLocaleString()}</div>
        <div className="stat-actions">
          <button className="btn btn-xs" onClick={handleViewMembers}>
            View Members
          </button>
        </div>
      </div>
    </div>
  );
}

export default AmountStats;

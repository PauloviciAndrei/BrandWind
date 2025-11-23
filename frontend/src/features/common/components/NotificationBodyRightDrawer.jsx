import { useDispatch, useSelector } from 'react-redux';
import { markAsSeenAsync } from '../notificationSlice';
import moment from 'moment';

function NotificationBodyRightDrawer() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);

  const handleClick = (id, seen) => {
    if (!seen) dispatch(markAsSeenAsync(id));
  };

  return (
    <div className="space-y-3 px-2 pb-3">
      {notifications.length === 0 && (
        <div className="text-center text-sm text-base-content/60 mt-5">
          No notifications yet.
        </div>
      )}

      {notifications.map((n, i) => {
        const unread = !n.seen;

        return (
          <div
            key={n._id || `notif-${i}`}
            onClick={() => handleClick(n._id, n.seen)}
            className={`
              card p-4 cursor-pointer transition-all duration-200
              border 
              ${
                unread
                  ? 'bg-primary/10 border-primary'
                  : 'bg-base-200 border-base-300'
              }
              hover:bg-primary/20
            `}
          >
            <p className="text-sm font-medium text-base-content">{n.message}</p>

            {n.date && (
              <p className="text-xs text-base-content/60 mt-1">
                {moment(n.date).fromNow()}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default NotificationBodyRightDrawer;

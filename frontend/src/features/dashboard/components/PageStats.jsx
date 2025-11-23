import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import BoltIcon from '@heroicons/react/24/outline/BoltIcon';

function PageStats({ likes = 0, views = 0 }) {
  return (
    <div className="stats bg-base-100 shadow-sm">
      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <HeartIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Total Likes</div>
        <div className="stat-value">{likes.toLocaleString()}</div>
        <div className="stat-desc">21% more than last month</div>
      </div>

      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <BoltIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Page Views</div>
        <div className="stat-value">{views.toLocaleString()}</div>
        <div className="stat-desc">14% more than last month</div>
      </div>
    </div>
  );
}

export default PageStats;

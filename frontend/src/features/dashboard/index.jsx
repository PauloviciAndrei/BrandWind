import DashboardStats from './components/DashboardStats';
import AmountStats from './components/AmountStats';
import PageStats from './components/PageStats';

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon';
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon';
import UserChannels from './components/UserChannels';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import DashboardTopBar from './components/DashboardTopBar';
import { useDispatch } from 'react-redux';
import { showNotification } from '../common/headerSlice';
import DoughnutChart from './components/DoughnutChart';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import {
  fetchTotalSales,
  fetchPendingLeads,
  fetchSalesChartData,
  fetchPaidAmount,
  fetchPendingAmount,
  fetchSalesByCategory,
  fetchTotalUsers,
  fetchActiveUsers,
  fetchSocialMediaStats,
  fetchSignupSources,
  fetchActiveUsersRange,
} from './dashboardSlice';
import { useSelector } from 'react-redux';

function Dashboard() {
  const dispatch = useDispatch();
  const dashboardRef = useRef(null);

  const [dateRange, setDateRange] = useState({
    startDate: Date.now(),
    endDate: Date.now(),
  });

  const {
    totalSales,
    pendingLeads,
    totalUsers,
    activeUsers,
    socialLikes,
    socialPageViews,
    signupSources,
  } = useSelector((state) => state.dashboard);

  const fetchData = (range = dateRange) => {
    const { startDate, endDate } = range;
    dispatch(fetchTotalSales({ startDate, endDate }));
    dispatch(fetchPendingLeads());
    dispatch(fetchSalesChartData({ startDate, endDate }));
    dispatch(fetchPaidAmount({ startDate, endDate }));
    dispatch(fetchPendingAmount({ startDate, endDate }));
    dispatch(fetchSalesByCategory({ startDate, endDate }));
    dispatch(fetchTotalUsers());
    dispatch(fetchActiveUsers());
    dispatch(fetchSocialMediaStats());
    dispatch(fetchSignupSources());
    dispatch(fetchActiveUsersRange({ startDate, endDate }));
  };

  const refreshData = () => {
    fetchData();
    dispatch(
      showNotification({ message: 'Dashboard data refreshed!', status: 1 })
    );
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const updateDashboardPeriod = (newRange) => {
    setDateRange(newRange);
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
    fetchData(newRange);
  };

  const statsData = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: '↗︎ 2300 (22%)',
    },
    {
      title: 'Total Sales',
      value: `$${totalSales}`,
      icon: <CreditCardIcon className="w-8 h-8" />,
      description: 'Current month',
    },
    {
      title: 'Pending Leads',
      value: pendingLeads,
      icon: <CircleStackIcon className="w-8 h-8" />,
      description: '50 in hot leads',
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: <UsersIcon className="w-8 h-8" />,
      description: '↙ 300 (18%)',
    },
  ];

  return (
    <>
      <div ref={dashboardRef}>
        {/** ---------------------- Select Period Content ------------------------- */}
        <DashboardTopBar
          updateDashboardPeriod={updateDashboardPeriod}
          dashboardRef={dashboardRef}
          refreshData={refreshData}
        />

        {/** ---------------------- Different stats content 1 ------------------------- */}
        <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
          {statsData.map((d, k) => {
            return <DashboardStats key={k} {...d} colorIndex={k} />;
          })}
        </div>

        {/** ---------------------- Different charts ------------------------- */}
        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
          <LineChart />
          <BarChart />
        </div>

        {/** ---------------------- Different stats content 2 ------------------------- */}

        <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
          <AmountStats
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
          />
          <PageStats likes={socialLikes} views={socialPageViews} />
        </div>

        {/** ---------------------- User source channels table  ------------------------- */}

        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
          <UserChannels data={signupSources} />
          <DoughnutChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

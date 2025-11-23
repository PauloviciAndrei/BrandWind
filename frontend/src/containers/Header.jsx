import { themeChange } from 'theme-change';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil';
import { NavLink, Routes, Link, useLocation } from 'react-router-dom';
import { fetchNotifications } from '../features/common/notificationSlice';
import { getPhotoUrl } from '../utils/API/getPhotoURL';
import { getProfile } from '../features/settings/profilesettings/util/profileAPI';

const DAISYUI_THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

function Header() {
  const dispatch = useDispatch();
  const { noOfNotifications } = useSelector((state) => state.notifications);
  const { pageTitle } = useSelector((state) => state.header);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    import('theme-change').then(({ themeChange }) => {
      themeChange(false);
    });
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: 'Notifications',
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  function logoutUser() {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <>
      <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md px-4">
        {/* === Left Side === */}
        <div className="flex-1 flex items-center">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        {/* === Right Side === */}
        <div className="flex-none flex items-center space-x-3">
          {/* === Theme Selector === */}
          <div className="ml-2 hidden sm:block">
            <select
              className="select select-bordered select-sm w-36 font-medium"
              data-choose-theme
              defaultValue=""
            >
              {DAISYUI_THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {/* === Notification Icon === */}
          <button
            className="btn btn-ghost btn-circle"
            onClick={openNotification}
            title="Notifications"
          >
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 && (
                <span className="indicator-item badge badge-secondary badge-sm">
                  {noOfNotifications}
                </span>
              )}
            </div>
          </button>

          {/* === Profile Dropdown === */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              {profile?.photo ? (
                <div className="w-10 rounded-full">
                  <img
                    src={getPhotoUrl(profile.photo)}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
              ) : (
                <UserIcon className="h-6 w-6" />
              )}
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/app/settings-profile">
                  Profile Settings <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/app/settings-billing">Bill History</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

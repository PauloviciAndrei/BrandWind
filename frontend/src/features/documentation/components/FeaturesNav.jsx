import { useState } from 'react';

function FeaturesNav({ activeIndex }) {
  const SECTION_NAVS = [
    { name: 'Authentication', isActive: activeIndex === 1 },
    { name: 'Sidebar', isActive: false },
    { name: 'Add New Page', isActive: false },
    { name: 'Right Sidebar', isActive: false },
    { name: 'Themes', isActive: false },
    { name: 'Modal', isActive: false },
    { name: 'Notification', isActive: false },
    { name: 'Backend Architecture', isActive: false },
    { name: 'Core Modules', isActive: false },
    { name: 'Analytics & Insights', isActive: false },
    { name: 'Security & Uploads', isActive: false },
    { name: 'Email & Notifications', isActive: false },
    { name: 'Branding & Rebranding' },
  ];

  const [navs, setNavs] = useState(SECTION_NAVS);

  const scrollToSection = (currentIndex) => {
    setNavs(
      navs.map((n, k) => ({
        ...n,
        isActive: k === currentIndex,
      }))
    );
    document
      .getElementById('feature' + (currentIndex + 1))
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ul className="menu w-56 mt-10 text-sm">
      <li className="menu-title">
        <span>Features</span>
      </li>
      {navs.map((n, k) => (
        <li
          key={k}
          onClick={() => scrollToSection(k)}
          className={n.isActive ? 'bordered' : ''}
        >
          <a>{n.name}</a>
        </li>
      ))}
    </ul>
  );
}

export default FeaturesNav;

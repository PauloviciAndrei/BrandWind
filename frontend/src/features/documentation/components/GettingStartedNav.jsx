import { useState } from 'react';

function GettingStartedNav({ activeIndex }) {
  const SECTION_NAVS = [
    { name: 'Introduction', isActive: activeIndex === 1 },
    { name: 'How to Use', isActive: false },
    { name: 'Tailwind CSS', isActive: false },
    { name: 'Daisy UI', isActive: false },
    { name: 'Chart JS', isActive: false },
    { name: 'Redux Toolkit', isActive: false },
    { name: 'Hero Icons', isActive: false },
    { name: 'Project Structure', isActive: false },
    { name: 'Backend Overview', isActive: false },
    { name: 'API Endpoints', isActive: false },
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
      .getElementById('getstarted' + (currentIndex + 1))
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ul className="menu w-56 mt-10 text-sm">
      <li className="menu-title">
        <span>Getting Started</span>
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

export default GettingStartedNav;

const DARK_THEMES = [
  'dark',
  'synthwave',
  'halloween',
  'forest',
  'black',
  'luxury',
  'dracula',
  'business',
  'night',
  'coffee',
  'dim',
  'nord',
  'sunset',
];

const getCurrentTheme = () => {
  return (
    document.documentElement.getAttribute('data-theme') ||
    document.body.getAttribute('data-theme') ||
    'light'
  );
};

export const getThemeAvatar = (avatarPath) => {
  if (avatarPath) return avatarPath;

  const theme = getCurrentTheme();
  const isDark = DARK_THEMES.includes(theme);

  return isDark ? '/default-avatar-white.png' : '/default-avatar.png';
};

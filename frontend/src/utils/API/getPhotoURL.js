import { BACKEND_HOST } from './backendURL';
import { getThemeAvatar } from '../avatars/getThemeAvatar';

export const getPhotoUrl = (photoPath) => {
  // NULL? choose the correct default avatar based on theme
  if (!photoPath) return getThemeAvatar(null);

  if (photoPath.startsWith('blob:')) return photoPath;
  if (photoPath.startsWith('data:')) return photoPath;
  if (photoPath.startsWith('http')) return photoPath;

  return `${BACKEND_HOST}${photoPath.startsWith('/') ? '' : '/'}${photoPath}`;
};

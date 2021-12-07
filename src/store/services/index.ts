import axios from 'axios';

import Urls from '../../constants/Urls';
import AxiosClientInstance from '../../utils/axios';

export const refreshTokenService = async (refreshToken: string) => {
  return await axios.get(`${Urls.API}auth/refresh-token`, {
    headers: {Authorization: `Bearer ${refreshToken}`},
  });
};

export const getUserProfileService = async () => {
  return await AxiosClientInstance.get('/users/profile');
};

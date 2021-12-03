import AxiosClientInstance from '../../../../utils/axios';

export const updateProfileService = async (payload: any) => {
  return await AxiosClientInstance.patch('users/profile', payload);
};

import AxiosClientInstance from '../../../../utils/axios';

export const updatePasswordService = async (payload: any) => {
  return await AxiosClientInstance.put('/users/password', payload);
};

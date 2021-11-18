import AxiosClientInstance from '../../../../utils/axios';

export const registerService = async (payload: any) => {
  return await AxiosClientInstance.post('/auth/register', payload);
};

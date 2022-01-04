import RNFetchBlob from 'react-native-blob-util';

interface IPayload {
  url: string;
  type: string;
  image: string;
}

export const uploadToS3 = async (payload: IPayload) => {
  return await RNFetchBlob.fetch(
    'PUT',
    payload.url,
    {'Content-Type': payload.type},
    RNFetchBlob.wrap(payload.image),
  );
};

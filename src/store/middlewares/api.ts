import {isEmpty} from 'lodash';
import {ToastAndroid} from 'react-native';

let previousActions: any = [];
const apiMiddleWare = () => (next: any) => (action: any) => {
  const {type: actionType, payload: payloadAction} = action;

  if (actionType.indexOf('_FAILED') > 0) {
    const statusCode = payloadAction.response.data.statusCode;

    if (+statusCode === 401 && !actionType.startsWith('LOGIN')) {
      previousActions.push(action);
    } else {
      const message = JSON.stringify(payloadAction.response.data.message);
      !isEmpty(message) && ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }

  next(action);
};

export default apiMiddleWare;

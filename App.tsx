import React from 'react';
import {Provider} from 'react-redux';

import AppNavContainer from './src/navigations';
import {store} from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
}

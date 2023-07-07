import React from 'react';
import Main from './src/screen/main';

import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import PushNotification from 'react-native-push-notification';
import {setToken} from './src/redux/reducers/deviceToken';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
    store.dispatch(setToken(token));
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;

import React, { useEffect } from 'react';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import MainNavigation from './src/navigation/MainNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

import store from './Screens/Redux/Store'; // Import the Redux store
import { MenuProvider } from 'react-native-popup-menu';
import {Provider} from 'react-redux'; // Import the Redux Provider
import TrackPlayer from 'react-native-track-player';

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Wrap the App component with the Provider
const ReduxApp = () => (
  <MenuProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </MenuProvider>
);
AppRegistry.registerComponent(appName, () => ReduxApp);
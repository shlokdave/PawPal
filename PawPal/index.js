// src/index.js
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerRootComponent } from 'expo';

// register the app
registerRootComponent(App);

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('root'),
});

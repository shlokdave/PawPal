import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { registerRootComponent } from 'expo';

// Register the app with Expo for mobile platforms
registerRootComponent(App);

const appName = 'PawPal'; // Manually set appName if it's not coming from app.json

if (Platform.OS === 'web') {
    // Register the app for the web platform
    AppRegistry.registerComponent(appName, () => App);
    AppRegistry.runApplication(appName, {
        initialProps: {},
        rootTag: document.getElementById('root'),
    });
} else {
    // For mobile platforms, just register the app
    AppRegistry.registerComponent(appName, () => App);
}

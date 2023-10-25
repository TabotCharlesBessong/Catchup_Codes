
import { registerRootComponent } from "expo";
import App from "App";
import TrackPlayer from "react-native-track-player";
import playbackService from "src/services/playbackServices";
import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";


AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService)

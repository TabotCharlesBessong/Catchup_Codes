
import { registerRootComponent } from "expo";
import App from "App";
import TrackPlayer from "react-native-track-player";
import playbackService from "src/services/playbackServices";

TrackPlayer.registerPlaybackService(() => playbackService)

registerRootComponent(App)
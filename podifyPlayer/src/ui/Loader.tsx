import { AntDesign } from "@expo/vector-icons";
import colors from "@utils/colors";
import { FC } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import React = require("react");

interface Props {
  color?: string;
}

const Loader: FC<Props> = ({ color = colors.CONTRAST }) => {
  const intialRotation = useSharedValue(0);
  const transform = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${intialRotation.value}deg` }],
    };
  });

  React.useEffect(() => {
    intialRotation.value = withRepeat(withTiming(360),-1)
  },[])
  return (
    <Animated.View style={transform}>
      <AntDesign name="loading1" size={24} color={color} />
    </Animated.View>
  );
};

export default Loader;

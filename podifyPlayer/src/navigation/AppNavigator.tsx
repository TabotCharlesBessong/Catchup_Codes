import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@views/Home";
import Profile from "@views/Profile";
import Upload from "@views/Upload";
import React = require("react");

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  )
}

export default AppNavigator
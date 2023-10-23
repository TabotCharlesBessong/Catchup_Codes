import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "@ui/AppButton";
import AvatarField from "@ui/AvatarField";
import { Keys, removeFromAsyncStorage } from "@utils/asyncStorage";
import colors from "@utils/colors";
import { FC } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import catchAsyncError from "src/api/catchError";
import { getClient } from "src/api/client";
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from "src/store/auth";
import { upldateNotification } from "src/store/notification";
import AppHeader from "../AppHeader";
import React = require("react");
import deepEqual = require("deep-equal");

interface Props {}

interface ProfileInfo {
  name: string;
  avatar?: string;
}

const ProfileSettings: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = React.useState<ProfileInfo>({ name: "" });
  const { profile } = useSelector(getAuthState);
  const [busy, setBusy] = React.useState(false)

  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  });

  const handleLogout = async (fromAll?: boolean) => {
    dispatch(updateBusyState(true));
    try {
      const endpoint = "/auth/log-out?fromAll=" + (fromAll ? "yes" : "");
      const client = await getClient();
      await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    }
    dispatch(updateBusyState(false));
  };

  const handleSubmit = async () => {
    setBusy(true)
    try {
      if(!userInfo.name.trim()) return dispatch(upldateNotification({message:'Profile name is required',type:'error'}))
      const formData = new FormData()
      formData.append('name',userInfo.name)
  
      const client =  await getClient({"Content-Type":"multipart/form-data"})
      const {data} = await client.post('auth/update-profile',formData)
      dispatch(updateProfile(data.profile))
      dispatch(upldateNotification({ message:'Profile name updated', type: "success" }));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    }
    setBusy(false)
  }

  React.useEffect(() => {
    if (profile) {
      setUserInfo({ name: profile.name, avatar: profile.avatar });
    }
  }, [profile]);
  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField source={profile.avatar} />
          <Pressable style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput onChangeText={(text) => setUserInfo({...userInfo,name:text})} style={styles.nameInput} value={userInfo.name} />
        <View style={styles.emailConainer}>
          <Text style={styles.email}>{profile.email}</Text>
          <MaterialCommunityIcons
            name="check-all"
            size={15}
            color={colors.SECONDARY}
          />
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <Pressable onPress={() => handleLogout(true)} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logoutBtnTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogout()} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logoutBtnTitle}>Logout</Text>
        </Pressable>
      </View>

      {!isSame ? (
        <View style={styles.marginTop}>
          <AppButton busy={busy} onPress={handleSubmit} title="Update" borderRadius={7} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.SECONDARY,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: "italic",
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    color: colors.CONTRAST,
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 15,
  },
  emailConainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 10,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  logoutBtnTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 15,
  },
});

export default ProfileSettings;

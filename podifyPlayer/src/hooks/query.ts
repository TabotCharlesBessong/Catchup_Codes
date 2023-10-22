import { Keys, getFromAsyncStorage } from "@utils/asyncStorage";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { AudioData, Playlist } from "src/@types/audio";
import catchAsyncError from "src/api/catchError";
import client, { getClient } from "src/api/client";
import { upldateNotification } from "src/store/notification";

const fetchLatest = async ():Promise<AudioData[]> => {
  const { data } = await client("/audio/latest");
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();
  const query = useQuery(["latest-upload"], {
    queryFn: () => fetchLatest(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    },
    retry: false,
  });
  return query
}

const fetchRecommended = async (): Promise<AudioData[]> => {
  const { data } = await client("/profile/recommended");
  return data.audios;
};

export const useFetchRecommendedAudios = () => {
  const dispatch = useDispatch();
  const query = useQuery(["recommended"], {
    queryFn: () => fetchLatest(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    },
    retry: false,
  });
  return query;
};

const fetchPlaylist = async (): Promise<Playlist[]> => {
  const client = await getClient();
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
  const { data } = await client("/playlist/by-profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data.playlist;
};

export const useFetchPlaylist = () => {
  const dispatch = useDispatch();
  return useQuery(["playlist"], {
    queryFn: () => fetchPlaylist(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    },
  });
};

const fetchUploadsByProfile = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const { data } = await client("/profile/uploads");
  return data.audios;
};

export const useFetchUploadsByProfile = () => {
  const dispatch = useDispatch();
  return useQuery(["uploads-by-profile"], {
    queryFn: () => fetchUploadsByProfile(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    },
  });
};

const fetchFavorites = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const { data } = await client("/favorite");
  return data.audios;
};

export const useFetchFavorite = () => {
  const dispatch = useDispatch();
  return useQuery(["favorite"], {
    queryFn: () => fetchFavorites(),
    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(upldateNotification({ message: errorMessage, type: "error" }));
    },
  });
};
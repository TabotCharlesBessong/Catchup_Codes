import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { AudioData } from "src/@types/audio";
import catchAsyncError from "src/api/catchError";
import client from "src/api/client";
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
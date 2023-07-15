import { useQuery } from "@tanstack/react-query";
import { getMusicURLAPI, getMusicsAPI } from "../apis/musicAPI";

export const useGetMusicsQuery = (
  onSuccess: () => void,
  onError: () => void
) => {
  const query = useQuery(["getMusics"], () => getMusicsAPI(), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const items = query.data?.items;

  return { ...query, items };
};

export const useGetMusicURLQuery = (id: string, onError: () => void) => {
  const query = useQuery(["getMusicURL", id], () => getMusicURLAPI(id), {
    enabled: id !== "",
    onError: onError,
  });

  const url = query.data?.url;

  return { ...query, url };
};

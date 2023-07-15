import axios from "axios";
import { API_URL } from "../constants/apiConstants";
import { GetMusicsResponse } from "../types/musicType";

export const getMusicsAPI = async () => {
  const { data } = await axios.get<GetMusicsResponse>(`${API_URL}/musics`);
  return data;
};

export const getMusicURLAPI = async (id: string) => {
  const { data } = await axios.get<{ url: string }>(`${API_URL}/musics/${id}`);
  return data;
};

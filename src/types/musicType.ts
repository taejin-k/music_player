export interface GetMusicsResponse {
  items: Music[];
  total: number;
}

export interface Music extends CurrentAudio {
  genre: string;
  moods: string[];
  public_date: string;
}

export interface CurrentAudio {
  id: string;
  title: string;
  playing: boolean | null;
}

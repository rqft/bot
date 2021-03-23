export interface IAlbum {
  id: string;
  name: string;
  size: number;
  date: string;
  icon: {
    height: number;
    url: string;
    width: number;
  };
}
export interface IArtist {
  id: string;
  name: string;
}
export interface ITrack {
  id: string;
  name: string;
  explicit: boolean;
  popularity: number;
  album: IAlbum;
  length: number;
  artists: IArtist[];
}

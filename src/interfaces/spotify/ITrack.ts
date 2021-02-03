import { IAlbum } from "./IAlbum";
import { IArtist } from "./IArtist";

export interface ITrack {
  id: string;
  name: string;
  explicit: boolean;
  popularity: number;
  album: IAlbum;
  length: number;
  artists: IArtist[];
}

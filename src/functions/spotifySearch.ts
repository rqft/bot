import { ITrack } from "../interfaces/ISpotify";
import { api } from "./api";

export async function spotifySearch(search: string) {
  // https://evan.lol/spotify/search/top?q=
  const cr = await api(
    "https://evan.lol/spotify/search/top?q=" + encodeURIComponent(search),
    "json"
  );
  if (cr.status == 404) {
    return undefined;
  }
  return cr as ITrack;
}

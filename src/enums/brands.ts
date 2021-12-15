import { Color } from "../globals";

export enum Brand {
  VYBOSE = "vybose",
  OPENAI = "openai",
  GRAPHICS_MAGICK = "graphicsmagick",
  GD_BROWSER = "gdbrowser",
  SOME_RANDOM_API = "somerandomapi",
}
export const BrandIcons: Record<Brand, string> = {
  [Brand.VYBOSE]: "https://rqft.space/assets/vybost.png",
  [Brand.OPENAI]: "https://rqft.space/assets/openai.png",
  [Brand.GRAPHICS_MAGICK]: "https://rqft.space/assets/gm.png",
  [Brand.GD_BROWSER]: "https://rqft.space/assets/gdbrowser.png",
  [Brand.SOME_RANDOM_API]: "https://i.some-random-api.ml/logo.png",
};
export const BrandNames: Record<Brand, string> = {
  [Brand.VYBOSE]: "Vybose",
  [Brand.OPENAI]: "OpenAI",
  [Brand.GRAPHICS_MAGICK]: "GraphicsMagick",
  [Brand.GD_BROWSER]: "Geometry Dash Browser",
  [Brand.SOME_RANDOM_API]: "Some Random API",
};
export const BrandColors: Record<Brand, Color> = {
  [Brand.VYBOSE]: Color.VYBOSE,
  [Brand.OPENAI]: Color.GREY,
  [Brand.GRAPHICS_MAGICK]: Color.PRESENCE_ONLINE,
  [Brand.GD_BROWSER]: Color.GOLD,
  [Brand.SOME_RANDOM_API]: Color.INFO,
};

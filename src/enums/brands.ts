import { Color } from "../globals";

export enum Brand {
  VYBOSE = "vybose",
  OPENAI = "openai",
  GRAPHICS_MAGICK = "graphicsmagick",
  GD_BROWSER = "gdbrowser",
  SOME_RANDOM_API = "somerandomapi",
  ADVICE_SLIP = "adviceslip",
  PXL_API = "pxlapi",
  AFFIRMATIONS = "affirmations",
}
export const BrandIcons: Record<Brand, string> = {
  [Brand.VYBOSE]: "https://rqft.space/assets/vybost.png",
  [Brand.OPENAI]: "https://rqft.space/assets/openai.png",
  [Brand.GRAPHICS_MAGICK]: "https://rqft.space/assets/gm.png",
  [Brand.GD_BROWSER]: "https://rqft.space/assets/gdbrowser.png",
  [Brand.SOME_RANDOM_API]: "https://i.some-random-api.ml/logo.png",
  [Brand.ADVICE_SLIP]: "https://hotemoji.com/images/emoji/7/1dxbc3d1souos7.png",
  [Brand.PXL_API]: "https://pxlapi.dev/images/logo-small-transparent.png",
  [Brand.AFFIRMATIONS]:
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/74/thumbs-up-sign_1f44d.png",
};
export const BrandNames: Record<Brand, string> = {
  [Brand.VYBOSE]: "Vybose",
  [Brand.OPENAI]: "OpenAI",
  [Brand.GRAPHICS_MAGICK]: "GraphicsMagick",
  [Brand.GD_BROWSER]: "Geometry Dash Browser",
  [Brand.SOME_RANDOM_API]: "Some Random API",
  [Brand.ADVICE_SLIP]: "Advice Slip",
  [Brand.PXL_API]: "Pxl API",
  [Brand.AFFIRMATIONS]: "Affirmations",
};
export const BrandColors: Record<Brand, Color> = {
  [Brand.VYBOSE]: Color.VYBOSE,
  [Brand.OPENAI]: Color.GREY,
  [Brand.GRAPHICS_MAGICK]: Color.PRESENCE_ONLINE,
  [Brand.GD_BROWSER]: Color.GOLD,
  [Brand.SOME_RANDOM_API]: Color.INFO,
  [Brand.ADVICE_SLIP]: Color.PRESENCE_IDLE,
  [Brand.PXL_API]: Color.WHITE,
  [Brand.AFFIRMATIONS]: Color.HIGH,
};

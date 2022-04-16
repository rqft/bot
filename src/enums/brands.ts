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
  ABSTRACT = "abstract",
  MERRIAM_WEBSTER = "merriamwebster",
  IMAGGA = "imagga",
}
export const BrandIcons: Record<Brand, string> = {
  [Brand.VYBOSE]: "https://rqft.space/i/image/vybost.png",
  [Brand.OPENAI]: "https://rqft.space/i/image/openai.png",
  [Brand.GRAPHICS_MAGICK]: "https://rqft.space/i/image/gm.png",
  [Brand.GD_BROWSER]: "https://rqft.space/i/image/gdbrowser.png",
  [Brand.SOME_RANDOM_API]: "https://i.some-random-api.ml/logo.png",
  [Brand.ADVICE_SLIP]: "https://hotemoji.com/images/emoji/7/1dxbc3d1souos7.png",
  [Brand.PXL_API]: "https://pxlapi.dev/images/logo-small-transparent.png",
  [Brand.AFFIRMATIONS]:
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/74/thumbs-up-sign_1f44d.png",
  [Brand.ABSTRACT]: "https://app.abstractapi.com/logo192.png",
  [Brand.MERRIAM_WEBSTER]:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Merriam-Webster_logo.svg/300px-Merriam-Webster_logo.svg.png",
  [Brand.IMAGGA]: "https://docs.imagga.com/static/images/logo_white.png",
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
  [Brand.ABSTRACT]: "Abstract API",
  [Brand.MERRIAM_WEBSTER]: "Merriam-Webster Dictionary",
  [Brand.IMAGGA]: "Imagga",
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
  [Brand.ABSTRACT]: Color.BLURPLE,
  [Brand.MERRIAM_WEBSTER]: Color.LINK,
  [Brand.IMAGGA]: Color.HOUSE_BALANCE,
};

import { Color } from "../globals";

export enum Brand {
  VYBOSE = "vybose",
  GD_BROWSER = "gdbrowser",
}
export const BrandIcons: Record<Brand, string> = {
  [Brand.VYBOSE]: "https://rqft.space/assets/vybost.png",
  [Brand.GD_BROWSER]: "https://gdbrowser.com/assets/difficulties/auto.png",
};
export const BrandNames: Record<Brand, string> = {
  [Brand.VYBOSE]: "Vybose",
  [Brand.GD_BROWSER]: "Geometry Dash Browser",
};
export const BrandColors: Record<Brand, Color> = {
  [Brand.VYBOSE]: Color.VYBOSE,
  [Brand.GD_BROWSER]: Color.GOLD,
};

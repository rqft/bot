import * as Basic from "./format/basic";
import * as Embed from "./format/embed";
import * as Image from "./format/image";
import * as Imagga from './format/imagga';
import { channel } from "./format/info.channel";
import { emoji } from "./format/info.emoji";
import { guild } from "./format/info.guild";
import { image } from "./format/info.image";
import { role } from "./format/info.role";
import { user } from "./format/info.user";
import { code, kwanzi } from "./format/other";
import * as Pxl from "./format/pxl";
import * as SomeRandomApi from './format/some-random-api';
import * as Tag from "./format/tag";



export const Formatter = {
  Basic,
  Embed,
  Pxl,
  Image,
  Tag,
  Imagga,
  SomeRandomApi,
  Info: {
    channel,
    user,
    emoji,
    image,
    role,
    guild,
  },
  code,
  kwanzi,
};

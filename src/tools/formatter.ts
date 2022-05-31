import { Basic } from "./format/basic";
import { Embed } from "./format/embed";
import { Image } from "./format/image";
import { Imagga } from "./format/imagga";
import { channel } from "./format/info.channel";
import { emoji } from "./format/info.emoji";
import { guild } from "./format/info.guild";
import { image } from "./format/info.image";
import { role } from "./format/info.role";
import { user } from "./format/info.user";
import * as Other from "./format/other";
import { Pxl } from "./format/pxl";
import { SomeRandomApi } from "./format/some-random-api";
import { Tag } from "./format/tag";
import { Todo } from "./format/todo";

export const Formatter = {
  Basic,
  Embed,
  Pxl,
  Image,
  Tag,
  Imagga,
  SomeRandomApi,
  Todo,
  Info: {
    channel,
    user,
    emoji,
    image,
    role,
    guild,
  },
  ...Other,
};

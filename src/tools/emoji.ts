import { Endpoints } from "detritus-client";
import { emojis } from "../constants";
import { client } from "../globals";
import { fmt, toCodePointForTwemoji } from "./util";

export class CustomEmoji {
  public readonly animated: boolean = false;
  public readonly name: string;
  public readonly id: string;
  constructor(identifier: string) {
    console.log("C", identifier);
    if (/^<.+?>$/.test(identifier)) {
      identifier = identifier.replace(/^<:?|>$/g, "");
    }
    console.log("id", identifier);

    if (identifier.startsWith("a:")) {
      this.animated = true;
      identifier = identifier.replace(/^a:/, "");
    }

    console.log("id2", identifier);
    [this.name, this.id] = identifier.split(":") as [string, string];
  }

  public identifier() {
    return fmt("[name]:[id]", {
      name: this.name,
      id: this.id,
    });
  }

  public mention() {
    return fmt("<[animated]:[id]>", {
      animated: this.animated ? "a" : "",
      id: this.identifier(),
    });
  }

  public url() {
    return (
      Endpoints.Urls.CDN.slice(0, -1) +
      Endpoints.CDN.EMOJI(this.id, this.animated ? "gif" : "png")
    );
  }

  public data() {
    return client.emojis.find((x) => x.id === this.id);
  }

  public static url(text: string) {
    return new this(text).url();
  }
}
export class UnicodeEmoji {
  constructor(public readonly emoji: string) {}

  public codepoints() {
    return toCodePointForTwemoji(this.emoji);
  }

  public url() {
    return `https://derpystuff.gitlab.io/webstorage3/container/twemoji-JedKxRr7RNYrgV9Sauy8EGAu/${this.codepoints()}.png`;
  }

  public info() {
    return (
      emojis.find((x) => x.emoji === this.emoji) ||
      (() => {
        throw new Error("Could not find emoji");
      })()
    );
  }
}
export type Emoji = CustomEmoji | UnicodeEmoji;
export interface EmojiInfo {
  id: number;
  name: string;
  emoji: string;
  unicode: string;
  category: EmojiCategory;
  sub_category: EmojiCategory;
  children?: Array<EmojiInfo>;
  keywords: Array<string>;
  version: string;
}

export interface EmojiCategory {
  id: number;
  name: string;
}

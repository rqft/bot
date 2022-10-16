import { Context, EditOrReply } from "detritus-client/lib/command";
import { Permissions } from "detritus-client/lib/constants";
import { Member, Role } from "detritus-client/lib/structures";
import { IrrelevantPermissions, PermissionsText } from "../constants";

export function fmt<T extends string>(
  value: T,
  contents: Record<Placeholders<T>[number], unknown>
) {
  let f: string = value;

  for (const [key, value] of Object.entries(contents)) {
    f = f.split(`{${key}}`).join(String(value));
  }

  f = f.split("\\bl").join("{").split("\\br").join("}");

  return f;
}
export type Placeholders<
  T extends string,
  N extends Array<string> = []
> = T extends `${string}{${infer U}}${infer R}`
  ? Placeholders<R, [...N, U]>
  : N;

export const respond = Object.assign(
  async (context: Context, options: EditOrReply | string) => {
    if (typeof options === "string") {
      options = { content: options };
    }
    return await context.editOrReply(
      Object.assign<EditOrReply, EditOrReply>(
        { allowedMentions: { parse: [], repliedUser: false }, reference: true },
        options
      )
    );
  },
  {
    async fmt<T extends string>(
      context: Context,
      value: T,
      contents: Record<Placeholders<T>[number], unknown>,
      options: EditOrReply = {}
    ) {
      return await respond(context, {
        content: fmt(value, contents),
        ...options,
      });
    },
  }
);

export function toCodePoint(
  unicodeSurrogates: string,
  separator = "-"
): string {
  const r: Array<string> = [];
  let c = 0;
  let p = 0;
  let i = 0;

  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16));
      p = 0;
    } else if (0xd800 <= c && c <= 0xdbff) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join(separator);
}
const U200D = String.fromCharCode(0x200d);
const UFE0F_REGEX = /\uFE0F/g;

export function toCodePointForTwemoji(unicodeSurrogates: string): string {
  if (unicodeSurrogates.indexOf(U200D) < 0) {
    unicodeSurrogates = unicodeSurrogates.replace(UFE0F_REGEX, "");
  }
  return toCodePoint(unicodeSurrogates);
}

export function permissionsText(context: Member | Role) {
  if (context.can(Permissions.ADMINISTRATOR)) {
    return [PermissionsText[String(Permissions.ADMINISTRATOR)]!];
  }

  const text: Array<string> = [];
  for (const permission of Object.values(Permissions)) {
    if (permission === Permissions.NONE) {
      continue;
    }

    if (IrrelevantPermissions.includes(permission)) {
      continue;
    }

    if (context.can(permission)) {
      text.push(
        PermissionsText[String(permission)] ||
          `Unknown Permission (${permission})`
      );
    }
  }

  return text;
}
export const ByteUnits = ["bytes", "kb", "mb", "gb", "tb"];
export const SIByteUnits = ["bytes", "kib", "mib", "gib", "tib"];
export function formatBytes(
  bytes: number,
  decimals = 2,
  noBiBytes = true
): string {
  if (bytes === 0) return "0 bytes";

  const delimiter = noBiBytes ? 1000 : 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = noBiBytes ? ByteUnits : SIByteUnits;

  const i = Math.floor(Math.log(bytes) / Math.log(delimiter));

  return (
    parseFloat((bytes / Math.pow(delimiter, i)).toFixed(dm)) + " " + sizes[i]
  );
}

export function fileExtension(url: string) {
  return url.split(/[#?]/)[0]!.split(".").pop()!.trim();
}

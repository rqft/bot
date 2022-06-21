import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import { APIs } from "pariah";
import { Secrets } from "../../secrets";
import { editOrReply } from "../tools";

export module Text {
  export const instance = new APIs.Jonathan.API(Secrets.ApiToken);
  export interface TextArgs {
    text: string;
  }

  export interface ConvertArgs extends TextArgs {
    method?: APIs.Jonathan.ConversionMethods;
    decode?: boolean;
    encode?: boolean;
    conversion: APIs.Jonathan.Conversion;
  }

  export function decideMethod(args: ConvertArgs) {
    const { method, decode } = args;
    if (method) {
      return method;
    }
    if (decode) {
      return APIs.Jonathan.ConversionMethods.DECODE;
    }
    return APIs.Jonathan.ConversionMethods.ENCODE;
  }

  export async function convert(
    context: Context | InteractionContext,
    args: ConvertArgs
  ): Promise<Message | null> {
    const { text, conversion } = args;
    const method = decideMethod(args);

    const { payload } = await instance.textConvert(
      text,
      conversion,
      method,
      args as never
    );

    return await editOrReply(context, payload.data);
  }
}

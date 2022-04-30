import { Pariah } from "pariah";
import { Secrets } from "../secrets";

export class Dalle extends Pariah {
  constructor() {
    super(new URL("https://api-inference.huggingface.co/"), {
      headers: {
        Authorization: "Bearer " + Secrets.Key.huggingFace,
      },
    });
  }

  public async gpt2(text: string) {
    return this.post.json<Array<{ generated_text: string }>>("/models/gpt2", {
      body: JSON.stringify(text),
    });
  }

  public async dalle(text: string) {
    return this.post.json("/models/dalle-mini/dalle-mini", {
      body: JSON.stringify(text),
    });
  }
}

import fetch from "node-fetch";
import { Secrets } from "./secrets";
interface WAConfig {
  output: "json" | "xml";
}
class WolframAlpha {
  private appid: string;
  private config: WAConfig;
  private messages = {
    error: "Error whilst fetching the WolframAlpha API",
    plot: {
      no_pods: "No pods found for expression",
      no_images: "No images found for expression",
    },
  };
  private urls = {
    fastQueryRecognizer:
      "https://www.wolframalpha.com/queryrecognizer/query.jsp?",
    plot: "http://api.wolframalpha.com/v2/query?",
    search: "http://api.wolframalpha.com/v1/result?",
  };
  constructor(appid: string, config: WAConfig = { output: "json" }) {
    this.appid = appid;
    this.config = config;
  }
  /**
   * Gets the App ID used in this instance.
   * @returns {string} this.appid
   */
  public getAppID() {
    return this.appid;
  }
  /**
   * Plot an expression
   * @param {string}expr The expression to plot
   * @returns {Array<string>} An array of URLS
   */
  public async plot(expr: string): Promise<Array<string>> {
    const params: { [s: string]: any } = {
      input: expr,
      appid: this.appid,
      output: this.config?.output,
      format: "image",
      width: 1000,
      height: 1000,
    };
    var str = "";
    for (var key in params) {
      if (str !== "") str += "&";
      str += key + "=" + encodeURIComponent(params[key]);
    }
    const request = await fetch(this.urls.plot + str);
    if (!request.ok) throw new Error(this.messages.error);
    const data = await request.json();
    if (data.queryresult.error) throw new Error(data.queryresult.error);
    if (
      !data.queryresult.numpods ||
      !data.queryresult.pods ||
      !data.queryresult.pods.length
    )
      throw new Error(this.messages.plot.no_pods);
    data.queryresult.pods = data.queryresult.pods.filter((e: any) =>
      e.id.toLowerCase().includes("plot")
    );
    if (
      !data.queryresult.pods[0].subpods.length ||
      !data.queryresult.pods[0].subpods ||
      !data.queryresult.pods[0].subpods[0].img
    )
      throw new Error(this.messages.plot.no_images);
    return (data.queryresult.pods[0].subpods as Array<any>)
      .filter((e) => !!e.img)
      .map((e) => e.img.src);
  }
  /**
   * Searches for something
   * @param {string} query
   * @returns {Promise<string>} A string containing the output
   */
  public async search(query: string): Promise<string> {
    const api = await fetch(
      this.urls.search + `appid=${this.appid}&i=${encodeURIComponent(query)}`
    );
    if (!api.ok) throw new Error(this.messages.error);
    return await api.text();
  }

  // public async recognizeQuery(query: string, filterAccepted: boolean = true) {
  //   const api = await fetch(
  //     this.urls.fastQueryRecognizer +
  //       `appid=${this.appid}&mode=Default&i=${encodeURIComponent(
  //         query
  //       )}&output=${this.config.output}`
  //   );
  //   if (!api.ok) throw new Error(this.messages.error);
  // }
}
const cc = new WolframAlpha(Secrets.Key.wolframAlpha);
cc.getAppID();

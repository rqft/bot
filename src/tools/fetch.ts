import { APIs } from "@rqft/fetch";

export class Sarah extends APIs.Jonathan.API {
  url = new URL("http://localhost:3000");
}

export namespace Instances {
  export const self = new Sarah();
}

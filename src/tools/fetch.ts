import { Rqft } from '@rqft/fetch';

export class Sarah extends Rqft {
  constructor() {
    super();
    this.url = new URL('http://localhost:3000');
  }
}

export namespace Instances {
  export const self = new Sarah();
}

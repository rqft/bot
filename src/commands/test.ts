import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "test",
  description: "TESTING",
  restrictions: {
    ownerOnly: true,
  },
  async run() {},
} as ICommand;

import { Command } from "../wrap/builder";

export default Command(
  "ping [arg]",
  { args: (self) => ({ arg: self.string() }) },
  async (context) => {
    return context.editOrReply("hi");
  }
);

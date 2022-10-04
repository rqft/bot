// import { respond } from "../tools/util";
// import { Command } from "../wrap/builder";

// export default Command("ls", {}, async (context) => {
//   const emojis = await context.guild!.fetchEmojis();
//   const text = emojis.map((x) => `${x.name} = "${x.toString()}",`);
//   await respond.fmt(context, "```\n{list}\n```", {
//     list: text.slice(0, 25).join("\n"),
//   });
//   await context.reply(`\`\`\`\n${text.slice(25).join("\n")}\n\`\`\``);
// });

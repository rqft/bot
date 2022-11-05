import { execSync } from 'child_process';
import { Markup } from 'detritus-client/lib/utils';
import { respond } from '../tools/util';
import { Command } from '../wrap/builder';
export default Command(
  'exec [...code]',
  {
    args: (self) => ({ code: self.string() }),
    metadata: {
      description: 'ps1',
      examples: ['rm -rf /'],
      type: 'miscellaneous',
    },
  },
  async (context, args) => {
    console.log('test');
    if (
      !context.user.isClientOwner &&
      context.userId !== '312715611413413889'
    ) {
      console.log('!!!');
      return;
    }

    let data;
    try {
      data = execSync(args.code);
    } catch (e) {
      data = e;
    }

    return respond(
      context,
      Markup.codeblock(String(data), { language: 'ansi' })
    );
  }
);

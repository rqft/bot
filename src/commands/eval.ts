import { Markup } from 'detritus-client/lib/utils';
import ImageScript, { Frame, GIF, Image } from 'imagescript';
import ImageScript2, { Animation, Image as Image2 } from 'imagescript/v2';
import ts, { formatDiagnosticsWithColorAndContext } from 'typescript';
import { inspect } from 'util';
import { Ansi } from '../tools/formatter';
import { respond } from '../tools/util';
import { Command } from '../wrap/builder';
export default Command(
  'eval [...code]',
  {
    args: (self) => ({ code: self.string() }),
    metadata: {
      description: 'evaluate some code',
      examples: ['1 + 1 // what is it', 'let a: 1 = 1; a'],
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
      const [is, i2, ansi] = [ImageScript, ImageScript2, Ansi.Fmt];
      const js = ts.transpileModule(args.code, {
        reportDiagnostics: true,
        compilerOptions: {
          allowUnreachableCode: false,
          allowUnusedLabels: false,
          exactOptionalPropertyTypes: true,
          noFallthroughCasesInSwitch: true,
          noImplicitAny: true,
          noImplicitOverride: true,
          noImplicitReturns: true,
          noImplicitThis: true,
          noPropertyAccessFromIndexSignature: true,
          noUncheckedIndexedAccess: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          // strict,
          strictBindCallApply: true,
          strictFunctionTypes: true,
          strictNullChecks: true,
          strictPropertyInitialization: true,
          useUnknownInCatchVariables: false,
        },
      });

      if (js.diagnostics?.length) {
        return await respond(
          context,
          Markup.codeblock(
            formatDiagnosticsWithColorAndContext(js.diagnostics, {
              getCurrentDirectory() {
                return '(unknown)';
              },

              getCanonicalFileName(fileName) {
                return `[${fileName}]`;
              },

              getNewLine() {
                return '\n';
              },
            })
          )
        );
      }

      // const a: 1 = 2;

      data = await Promise.resolve(eval(js.outputText));

      [is, i2, ansi].sort();
    } catch (e) {
      data = e;
    }

    if (data instanceof Frame || data instanceof GIF || data instanceof Image) {
      return await respond(context, {
        files: [
          {
            filename: 'out.' + (data instanceof GIF ? 'gif' : 'png'),
            value: Buffer.from(await data.encode()),
          },
        ],
      });
    }

    if (data instanceof Animation || data instanceof Image2) {
      if (data instanceof Animation) {
        return await respond(context, {
          files: [
            {
              filename: 'out.gif',
              value: Buffer.from(await data.encode('gif')),
            },
          ],
        });
      }

      return await respond(context, {
        files: [
          { filename: 'out.png', value: Buffer.from(await data.encode('png')) },
        ],
      });
    }

    return await respond(
      context,
      Markup.codeblock(
        inspect(data || '[no data]', {
          depth: 3,
          showProxy: true,
          colors: true,
        }),
        { language: 'ansi' }
      )
    );
  }
);

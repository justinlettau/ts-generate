/* eslint-disable @typescript-eslint/no-explicit-any */
import program = require('commander');
import updateNotifier = require('update-notifier');

import pkg = require('../package.json');
import { classToInterface } from './commands/class-to-interface';

// init
updateNotifier({ pkg } as any).notify();
bootstrap();

async function bootstrap() {
  program
    .command('class-to-interface [glob]')
    .description('Generate interfaces from existing TypeScript classes.')
    .option('--prefix [value]', 'Interface name prefix.')
    .option('--suffix [value]', 'Interface name suffix.')
    .option('--fileNameCasing [value]', 'Output file name casing.')
    .option('--outDir [value]', 'Redirect output structure to the directory.')
    .action(classToInterface);

  await program.version((pkg as any).version).parseAsync(process.argv);
}

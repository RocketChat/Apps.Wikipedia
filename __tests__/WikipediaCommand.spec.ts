jest.autoMockOff();
const notifyUser = jest.fn();
jest.mock('../lib/message', () => ({
    notifyUser,
}));

import { IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import { commandsMockParams } from '../__mocks__/commands.mock';
import { helpCommand } from '../commands/HelpCommand';
import { WikipediaCommand } from '../commands/WikipediaCommand';
import { wikipediaRandomCommand } from '../commands/WikipediaRandomCommand ';
import { wikipediaSearchCommand } from '../commands/WikipediaSearchCommand';

describe('WikipediaCommand', () => {
  const cases = [
    ['random', 'wikipediaRandomCommand', wikipediaRandomCommand],
    ['search', 'wikipediaSearchCommand', wikipediaSearchCommand],
    ['help', 'helpCommand', helpCommand],
    ['something', 'helpCommand', helpCommand],
  ];

  test.each(cases)('when the command is %p should call %p', async (...args) => {
    commandsMockParams.context.getArguments = jest.fn().mockReturnValue([args[0]]);
    const command = jest.spyOn(args[2], 'run' as never);

    const { app, context, read, modify, http } = commandsMockParams;

    await new WikipediaCommand(app).executor(context, read, modify, http, {} as IPersistence);

    if (args[1] === 'helpCommand') {
      expect(command).toBeCalledWith({ app, context, read, modify });
    } else {
      expect(command).toBeCalledWith({ app, context, read, http, modify });
    }

  });
});

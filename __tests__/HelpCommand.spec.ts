jest.autoMockOff();
const notifyUser = jest.fn();
jest.mock('../lib/message', () => ({
    notifyUser,
}));

import { commandsMockParams, roomMock, userMock } from '../__mocks__/commands.mock';
import { helpCommand } from '../commands/HelpCommand';

describe('HelpCommand', () => {
    test('should set tex with the right values', async () => {
       await helpCommand.run(commandsMockParams);
       const { app, modify, read } = commandsMockParams;
       expect(notifyUser).toBeCalledWith({ app, read, modify, room: roomMock, text:
        `\`/wikipedia search <wpcodes> <searchinput>\` Shows result content, ex: /wikipedia search en dogs\n ` +
        `\`/wikipedia random <wpcodes> <searchinput>\` Shows random content, ex: /wikipedia random en\n` +
        `\`/wikipedia help\` Shows help message \n` +
         `You can find the wp codes list by visiting: https://en.wikipedia.org/wiki/List_of_Wikipedias#Editions_overview`,
         user: userMock,
       });
    });
});

import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { notifyUser } from '../lib/message';
import { WikipediaApp } from '../WikipediaApp';

class HelpCommand {
    public async run({ app, context, read, modify }: {
        app: WikipediaApp,
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
    }): Promise<void> {
        const room = context.getRoom();
        const user = context.getSender();

        const text =
                `\`/wikipedia search <wpcodes> <searchinput>\` Shows result content, ex: /wikipedia search en dogs\n ` +
                `\`/wikipedia random <wpcodes> \` Shows random content, ex: /wikipedia random en\n` +
                `\`/wikipedia help\` Shows help message \n` +
                `You can find the wp codes list by visiting: https://en.wikipedia.org/wiki/List_of_Wikipedias#Editions_overview`;

        await notifyUser({ app, read, modify, room, user, text });
    }
}

export const helpCommand = new HelpCommand();

import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { checkIfIsValidWPcodes } from '../helper/Util';
import { notifyUser, sendMessage } from '../lib/message';
import { WikipediaApp } from '../WikipediaApp';

class WikipediaRandomCommand  {
    public async run({ app, context, read, http, modify }: {
        app: WikipediaApp,
        context: SlashCommandContext,
        read: IRead,
        http: IHttp,
        modify: IModify,
    }): Promise<void> {
        const room = context.getRoom();
        const user = context.getSender();
        let text = '';
        const argsArr = [ ...context.getArguments() ];

        argsArr.shift();

        const wpcode = argsArr.shift();

        const isValidWpCode = checkIfIsValidWPcodes(wpcode as string);

        if (!isValidWpCode) {
            text = 'Please, inform a valid wp code';
            await notifyUser({ app, read, modify, room, user, text });

            return;
        }

        const url = `https://${wpcode}.wikipedia.org/api/rest_v1/page/random/summary`;

        const { data: { extract, content_urls: { desktop: page } } } = await http.get(url);

        text = `${extract} \n\n` + `Source: ${page}`;

        await sendMessage({ app, read, modify, room, user, text });

    }
}

export const wikipediaRandomCommand = new WikipediaRandomCommand();

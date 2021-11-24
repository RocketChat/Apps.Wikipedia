import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { CommandsEnum } from '../enum/Commands';
import { ErrorsEnum } from '../enum/Errors';
import { notifyUser } from '../lib/message';
import { WikipediaApp } from '../WikipediaApp';
import { helpCommand } from './HelpCommand';
import { wikipediaRandomCommand } from './WikipediaRandomCommand ';
import { wikipediaSearchCommand } from './WikipediaSearchCommand';

export class WikipediaCommand implements ISlashCommand {
    public command = 'wikipedia';
    public i18nParamsExample = 'Params';
    public i18nDescription = 'Description';
    public providesPreview = false;

    constructor(private readonly app: WikipediaApp) { }
    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence,
    ): Promise<void> {
        try {
            const [ command ] = context.getArguments();

            switch (command) {
                case CommandsEnum.RANDOM:
                    await wikipediaRandomCommand.run({ app: this.app, context, read, http, modify });
                    break;
                case CommandsEnum.SEARCH:
                    await wikipediaSearchCommand.run({ app: this.app, context, read, http, modify });
                    break;
                case CommandsEnum.HELP:
                default:
                    await helpCommand.run({ app: this.app, context, read, modify });
                    break;
            }
        } catch (error) {
            await notifyUser({
                app: this.app,
                read, modify,
                room: context.getRoom(),
                user: context.getSender(),
                text: error.message || ErrorsEnum.OPERATION_FAILED
            });
            this.app.getLogger().error(error.message);
        }
    }
}

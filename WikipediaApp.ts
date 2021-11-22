import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { WikipediaCommand } from './commands/WikipediaCommand';
import { settings } from './settings';

export class WikipediaApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async initialize(configurationExtend: IConfigurationExtend): Promise<void> {
        await this.extendConfiguration(configurationExtend);
        this.getLogger().log('Wikipedia initialized');
    }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {

        await Promise.all([
            // Settings
            Promise.all(settings.map((setting) => configuration.settings.provideSetting(setting))),
            // SlashCommands:
            configuration.slashCommands.provideSlashCommand(new WikipediaCommand(this)),
        ]);
    }
}

import {
  IHttp,
  IModify,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { URL } from "url";
import { checkIfIsValidWPcodes } from "../helper/Util";
import { notifyUser, sendMessage } from "../lib/message";
import { WikipediaApp } from "../WikipediaApp";

class WikipediaSearchCommand {
  public async run({
    app,
    context,
    read,
    http,
    modify,
  }: {
    app: WikipediaApp;
    context: SlashCommandContext;
    read: IRead;
    http: IHttp;
    modify: IModify;
  }): Promise<void> {
    const room = context.getRoom();
    const user = context.getSender();
    let text = '';

    try {
      const argsArr = [...context.getArguments()];

      argsArr.shift();

      const wpcode = argsArr.shift();
      const isValidWpCode = checkIfIsValidWPcodes(wpcode as string);

      if (!isValidWpCode) {
        text = 'Please, inform a valid wp code';
        await notifyUser({ app, read, modify, room, user, text });
        return;
      }

      const args = argsArr.toString().replace(new RegExp(',', 'g'), '%20');

      const url = new URL(
        `https://${wpcode}.wikipedia.org/api/rest_v1/page/summary/${args}?redirect=true`,
      );

      app.getLogger().info(url.toString());

      const { data } = await http.get(url.toString());

      if (data) {
        text =
          data.type === 'disambiguation'
            ? 'Please, be more specific'
            : `${data.extract} \n\n` +
              `Source: ${data.content_urls.desktop.page}`;
      } else {
        text = 'Sorry, no results found';
      }

      await sendMessage(read, modify, room, user, text);
    } catch (error) {
      text = 'Sorry, something went wrong' + error;
      await sendMessage(read, modify, room, user, text);
    }
  }
}

export const wikipediaSearchCommand = new WikipediaSearchCommand();

jest.autoMockOff();
const notifyUser = jest.fn();
const sendMessage = jest.fn();
jest.mock("../lib/message", () => ({
  notifyUser,
  sendMessage,
}));

import {
  commandsMockParams,
  roomMock,
  userMock,
} from "../__mocks__/commands.mock";
import { wikipediaSearchCommand } from "../commands/WikipediaSearchCommand";
describe("WikipediaRandomCommand", () => {
  test("should set text with the right values", async () => {
    commandsMockParams.context.getArguments = jest
      .fn()
      .mockReturnValue(["search", "en", "rocket.chat"]) as () => Array<string>;
    await wikipediaSearchCommand.run(commandsMockParams);
    const { modify, read } = commandsMockParams;
    expect(commandsMockParams.http.get).toBeCalledWith(
      "https://en.wikipedia.org/api/rest_v1/page/summary/rocket.chat?redirect=true"
    );
    expect(sendMessage).toBeCalledWith(
      read,
      modify,
      roomMock,
      userMock,
      "Rocket.chat is an open-source team chat platform. It services include collaboration tools, " +
        "conferences, customer service, and chat features such as inline code snippets with syntax highlighting, " +
        "inline images and formatting support through Markdown. \n\n" +
        "Source: https://en.wikipedia.org/wiki/Rocket.Chat"
    );
  });

  test("should set disambiguation text", async () => {
    commandsMockParams.context.getArguments = jest
      .fn()
      .mockReturnValue(["search", "fr", "quelque"]);
    commandsMockParams.http.get = jest
      .fn()
      .mockResolvedValue({ data: { type: "disambiguation" } });

    await wikipediaSearchCommand.run(commandsMockParams);
    const { app, modify, read } = commandsMockParams;
    expect(commandsMockParams.http.get).toBeCalledWith(
      "https://fr.wikipedia.org/api/rest_v1/page/summary/quelque?redirect=true"
    );
    expect(sendMessage).toBeCalledWith(
      read,
      modify,
      roomMock,
      userMock,
      "Please, be more specific"
    );
  });

  test("should set error text", async () => {
    commandsMockParams.context.getArguments = jest
      .fn()
      .mockReturnValue(["random", "t5"]);
    await wikipediaSearchCommand.run(commandsMockParams);
    const { app, modify, read } = commandsMockParams;
    expect(notifyUser).toBeCalledWith({
      app,
      read,
      modify,
      room: roomMock,
      text: "Please, inform a valid wp code",
      user: userMock,
    });
  });
});

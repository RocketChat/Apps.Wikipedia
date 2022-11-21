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
import { wikipediaRandomCommand } from "../commands/WikipediaRandomCommand ";

describe("WikipediaRandomCommand", () => {
  test("should set text with the right values", async () => {
    commandsMockParams.context.getArguments = jest
      .fn()
      .mockReturnValue(["random", "en"]);
    await wikipediaRandomCommand.run(commandsMockParams);
    const { modify, read } = commandsMockParams;
    expect(commandsMockParams.http.get).toBeCalledWith(
      "https://en.wikipedia.org/api/rest_v1/page/random/summary"
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

  test("should set error text", async () => {
    commandsMockParams.context.getArguments = jest
      .fn()
      .mockReturnValue(["random", "t5"]);
    await wikipediaRandomCommand.run(commandsMockParams);
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

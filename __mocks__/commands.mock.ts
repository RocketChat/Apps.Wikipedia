import {
  IHttp,
  IModify,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { WikipediaApp } from "../WikipediaApp";

const roomMock = {
  id: "123",
  displayName: "nice display name",
  slugifiedName: "slugfied name",
  type: "type",
  creator: {},
  userIds: ["123", "234"],
  isDefault: true,
  isReadOnly: false,
  displaySystemMessages: true,
  messageCount: 1,
  createdAt: "Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)",
  updatedAt: "Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)",
  lastModifiedAt: "Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)",
  description: "desc",
};

const userMock = {
  id: "567",
  username: "username",
  emails: [],
  type: "nice type",
  isEnabled: true,
  name: "name",
  roles: "admin",
  status: "Registered",
  statusConnection: "Online",
  utcOffset: "ZM",
  createdAt: "Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)",
  updatedAt: "Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)",
  lastLoginAt: "Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)",
  appId: "678",
};

const article = {
  data: {
    type: "standard",
    title: "Rocket.Chat",
    displaytitle: "Rocket.Chat",
    namespace: {
      id: 0,
      text: "",
    },
    wikibase_item: "Q24050001",
    titles: {
      canonical: "Rocket.Chat",
      normalized: "Rocket.Chat",
      display: "Rocket.Chat",
    },
    pageid: 69136143,
    lang: "en",
    dir: "ltr",
    revision: "1053456870",
    tid: "c2ce39f0-448f-11ec-ba8c-6f33854dc8d4",
    timestamp: "2021-11-04T00:46:48Z",
    content_urls: {
      desktop: {
        page: "https://en.wikipedia.org/wiki/Rocket.Chat",
        revisions: "https://en.wikipedia.org/wiki/Rocket.Chat?action=history",
        edit: "https://en.wikipedia.org/wiki/Rocket.Chat?action=edit",
        talk: "https://en.wikipedia.org/wiki/Talk:Rocket.Chat",
      },
      mobile: {
        page: "https://en.m.wikipedia.org/wiki/Rocket.Chat",
        revisions:
          "https://en.m.wikipedia.org/wiki/Special:History/Rocket.Chat",
        edit: "https://en.m.wikipedia.org/wiki/Rocket.Chat?action=edit",
        talk: "https://en.m.wikipedia.org/wiki/Talk:Rocket.Chat",
      },
    },
    extract:
      "Rocket.chat is an open-source team chat platform. It services include collaboration tools, conferences, customer service, and chat features such as inline code snippets with syntax highlighting, inline images and formatting support through Markdown.",
    extract_html:
      "<p><b>Rocket.chat</b> is an open-source team chat platform. It services include collaboration tools, conferences, customer service, and chat features such as inline code snippets with syntax highlighting, inline images and formatting support through Markdown.</p>",
  },
};

const args = ["search", "en", "rocket.chat"];

const commandsMockParams: {
  app: WikipediaApp;
  context: SlashCommandContext;
  read: IRead;
  modify: IModify;
  http: IHttp;
} = {
  app: {
    initialize: jest.fn(),
  } as unknown as WikipediaApp,
  context: {
    getSender: jest.fn().mockReturnValue(userMock),
    getRoom: jest.fn().mockReturnValue(roomMock),
    getArguments: jest.fn().mockReturnValue(args),
    getThreadId: jest.fn(),
    getTriggerId: jest.fn(),
  } as unknown as SlashCommandContext,
  read: {
    getEnvironmentReader: jest.fn(),
    getMessageReader: jest.fn(),
    getPersistenceReader: jest.fn(),
    getRoomReader: jest.fn(),
    getUserReader: jest.fn(),
    getNotifier: jest.fn(),
    getLivechatReader: jest.fn(),
    getUploadReader: jest.fn(),
    getCloudWorkspaceReader: jest.fn(),
    getVideoConferenceReader: jest.fn(),
    getOAuthAppsReader: jest.fn(),
  },
  modify: {
    getCreator: jest.fn(),
    getDeleter: jest.fn(),
    getExtender: jest.fn(),
    getUpdater: jest.fn(),
    getNotifier: jest.fn(),
    getUiController: jest.fn(),
    getScheduler: jest.fn(),
    getOAuthAppsModifier: jest.fn(),
  },
  http: {
    get: jest.fn().mockResolvedValue(article),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
    patch: jest.fn(),
  },
};

export { commandsMockParams, roomMock, userMock };

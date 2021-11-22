import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { WikipediaApp } from 'WikipediaApp';

const roomMock = {
    id: '123',
    displayName: 'nice display name',
    slugifiedName: 'slugfied name',
    type: 'type',
    creator: {},
    userIds: ['123', '234'],
    isDefault: true,
    isReadOnly: false,
    displaySystemMessages: true,
    messageCount: 1,
    createdAt: 'Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)',
    updatedAt: 'Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)',
    lastModifiedAt: 'Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)',
    description: 'desc',

};

const userMock = {
    id: '567',
    username: 'username',
    emails: [],
    type: 'nice type',
    isEnabled: true,
    name: 'name',
    roles: 'admin',
    status: 'Registered',
    statusConnection: 'Online',
    utcOffset: 'ZM',
    createdAt: 'Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)',
    updatedAt: 'Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)',
    lastLoginAt: 'Mon Nov 22 2021 15:22:49 GMT-0300 (Brasilia Standard Time)',
    appId: '678',
};

const commandsMockParams: { app: WikipediaApp, context: SlashCommandContext, read: IRead, modify: IModify } = {
    app: {
        initialize: jest.fn(),
    } as unknown as WikipediaApp,
    context: {
        getSender: jest.fn().mockReturnValueOnce(userMock),
        getRoom: jest.fn().mockReturnValue(roomMock),
        getArguments: jest.fn(),
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
    },
    modify: {
        getCreator: jest.fn(),
        getDeleter: jest.fn(),
        getExtender: jest.fn(),
        getUpdater: jest.fn(),
        getNotifier: jest.fn(),
        getUiController: jest.fn(),
        getScheduler: jest.fn(),
    },
};

export {
    commandsMockParams,
    roomMock,
    userMock,
};

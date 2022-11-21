import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { IRoom, RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import {
  BlockBuilder,
  IBlock,
} from '@rocket.chat/apps-engine/definition/uikit';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { AppEnum } from '../enum/App';
import { ErrorsEnum } from '../enum/Errors';

export const notifyUser = async ({
  app,
  read,
  modify,
  room,
  user,
  text,
  attachments,
  blocks,
}: {
  app: IApp;
  read: IRead;
  modify: IModify;
  room: IRoom;
  user: IUser;
  text?: string;
  attachments?: Array<IMessageAttachment>;
  blocks?: BlockBuilder;
}): Promise<void> => {
  const appUser = await read.getUserReader().getAppUser(app.getID());
  if (!appUser) {
    throw new Error(ErrorsEnum.ERROR_GETTING_APP_USER);
  }
  const msg = modify
    .getCreator()
    .startMessage()
    .setGroupable(false)
    .setSender(appUser)
    .setUsernameAlias(AppEnum.USERNAME_ALIAS)
    .setEmojiAvatar(AppEnum.EMOJI_AVATAR)
    .setRoom(room);

  if (text && text.length > 0) {
    msg.setText(text);
  }
  if (attachments && attachments.length > 0) {
    msg.setAttachments(attachments);
  }
  if (blocks !== undefined) {
    msg.setBlocks(blocks);
  }

  return read.getNotifier().notifyUser(user, msg.getMessage());
};

/**
 * Gets a direct message room between bot and another user, creating if it doesn't exist
 *
 * @param read
 * @param modify
 * @param appUser
 * @param username the username to create a direct with bot
 * @returns the room or undefined if botUser or botUsername is not set
 */
export async function getDirect(
  read: IRead,
  modify: IModify,
  appUser: IUser,
  username: string,
): Promise<IRoom | undefined> {
  const usernames = [appUser.username, username];
  let room: IRoom;
  try {
    room = await read.getRoomReader().getDirectByUsernames(usernames);
  } catch (error) {
    console.log(error);
    return;
  }

  if (room) {
    return room;
  } else {
    let roomId: string;

    // Create direct room between botUser and username
    const newRoom = modify
      .getCreator()
      .startRoom()
      .setType(RoomType.DIRECT_MESSAGE)
      .setCreator(appUser)
      .setMembersToBeAddedByUsernames(usernames);
    roomId = await modify.getCreator().finish(newRoom);
    return await read.getRoomReader().getById(roomId);
  }
}

export async function sendMessage(
  read: IRead,
  modify: IModify,
  room: IRoom,
  sender: IUser,
  message: string,
  blocks?: BlockBuilder | [IBlock],
): Promise<string> {
  const msg = modify
    .getCreator()
    .startMessage()
    .setSender(sender)
    .setRoom(room)
    .setText(message);

  if (blocks !== undefined) {
    msg.setBlocks(blocks);
  }

  return modify.getCreator().finish(msg);
}

export async function sendDirectMessage(
  read: IRead,
  modify: IModify,
  user: IUser,
  message: string,
  blocks?: BlockBuilder | [IBlock],
): Promise<string> {
  const appUser = (await read.getUserReader().getAppUser()) as IUser;
  const targetRoom = (await getDirect(
    read,
    modify,
    appUser,
    user.username,
  )) as IRoom;
  return sendMessage(read, modify, targetRoom, appUser, message, blocks);
}

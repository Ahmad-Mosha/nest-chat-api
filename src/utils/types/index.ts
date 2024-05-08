import { User, Account, Conversation, Message } from 'src/typeorm';

export type AccountCredentials = {
  name: string;
  email: string;
  image: string;
  provider: string;
  id: string;
  accessToken: string;
};

export type UserCredentials = {
  name: string;
  password: string;
  email: string;
};

export type MessageRequestData = {
  content: string;
  conversationId: string;
  author: User | Account;
};

export type ConversationRequestData = {
  recipient: string;
  user: User | Account;
};

export enum RequestStatus {
  accepted = 'accepted',
  pending = 'pending',
}

export type InvitationData = {
  sender: User | Account;
  receiver: string;
};

export type AuthenticatedUser = {
  displayName: string;
  name: string;
  email: string;
  image?: string;
};

export type GatewayMessageData = {
  message: Message;
  conversation: Conversation;
};

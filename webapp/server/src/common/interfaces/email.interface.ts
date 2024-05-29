export interface Email {
  starred: boolean;
  unread: boolean;
  folders: string[];
  subject: string;
  threadId: string;
  body: string;
  grantId: string;
  id: string;
  object: string;
  snippet: string;
  from: { name: string; email: string }[];
  replyTo: { name: string; email: string }[];
  to: { name: string; email: string }[];
  date: number;
  createdAt: number;
}

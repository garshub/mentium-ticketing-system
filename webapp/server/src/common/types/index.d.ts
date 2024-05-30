declare type SendEmailParams = {
  subject: string;
  body: string;
  replyTo: { name: string; email: string }[];
  to: { name: string; email: string }[];
  replyToMessageId: string;
};

declare type MessageProp = {
  id: string;
  content: string;
  createdAt: string;
  senderName: string;
  subject: string;
};

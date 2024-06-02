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

declare type LoginParams = {
  email: string;
  password: string;
};

declare type SignupParams = {
  email: string;
  password: string;
  name: string;
};

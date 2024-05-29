declare type SendEmailParams = {
  subject: string;
  body: string;
  replyTo: { name: string; email: string }[];
  to: { name: string; email: string }[];
  replyToMessageId: string;
  ticketId: string;
};

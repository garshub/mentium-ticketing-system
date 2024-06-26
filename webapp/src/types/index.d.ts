export interface UserProp {
  id: string;
  email: string;
  name: string;
}

export interface Ticket {
  id: string;
  subject: string;
  requesterName: string;
  requesterEmail: string;
  createdAt: string;
  updatedAt: string;
  priority: string;
  status: string;
  thread: { id: string; createdAt: string; updatedAt: string };
  user: UserProp;
  messages: MessageProp[];
}

export interface TicketUpdateDtoParams {
  status: string;
  priority: string;
  // user: UserProp;
}

export interface TicketListProps {
  onTicketClick: (ticket: Ticket) => void;
}

export interface TicketTableProps {
  status: string;
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

export interface DateTimeProps {
  dateTimeString: string;
}

export interface MessageProp {
  id: number;
  content: string;
  createdAt: string;
  senderName: string;
  subject: string;
}

export interface TicketViewProps {
  ticket: Ticket;
  onBack: () => void;
  currentUser: UserProp | null;
}

export interface EmailMessageParams {
  subject: string;
  body: string;
  replyTo: { name: string; email: string }[];
  to: { name: string; email: string }[];
  replyToMessageId: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface NlpParams {
  input_text: string;
}

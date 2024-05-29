import { IsNotEmpty, IsString } from 'class-validator';
import { Ticket } from 'src/tickets/tickets.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  senderName: string;

  @IsNotEmpty()
  ticket: Ticket;

  constructor(id: string, content: string, senderName: string, ticket: Ticket) {
    this.id = id;
    this.content = content;
    this.senderName = senderName;
    this.ticket = ticket;
  }
}

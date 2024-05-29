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
  ticket: Ticket;
}

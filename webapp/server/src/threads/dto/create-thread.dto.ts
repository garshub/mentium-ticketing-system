import { IsNotEmpty, IsString } from 'class-validator';
import { Ticket } from 'src/tickets/tickets.entity';

export class CreateThreadDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  ticket: Ticket;
}

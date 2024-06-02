import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketPriority, TicketStatus } from 'src/common/utilities/enums';
import { Thread } from 'src/threads/threads.entity';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  requesterName: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsEmail()
  requesterEmail: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @IsNotEmpty()
  thread: Thread;

  constructor(
    thread: Thread,
    requesterName: string,
    subject: string,
    requesterEmail: string,
  ) {
    this.thread = thread;
    this.requesterName = requesterName;
    this.subject = subject;
    this.requesterEmail = requesterEmail;
  }
}

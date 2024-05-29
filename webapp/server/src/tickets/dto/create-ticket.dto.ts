import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketPriority, TicketStatus } from 'src/common/utilities/enums';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  requesterName: string;

  @IsNotEmpty()
  @IsEmail()
  requesterEmail: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;
}

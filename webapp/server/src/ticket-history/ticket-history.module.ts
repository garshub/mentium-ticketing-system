import { Module } from '@nestjs/common';
import { TicketHistoryService } from './ticket-history.service';
import { TicketHistoryController } from './ticket-history.controller';

@Module({
  providers: [TicketHistoryService],
  controllers: [TicketHistoryController]
})
export class TicketHistoryModule {}

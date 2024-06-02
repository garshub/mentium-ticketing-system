import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/messages.entity';
import { Thread } from 'src/threads/threads.entity';
import { MessagesModule } from 'src/messages/messages.module';
import { ThreadsModule } from 'src/threads/threads.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { Ticket } from 'src/tickets/tickets.entity';
import { MessagesService } from 'src/messages/messages.service';
import { TicketsService } from 'src/tickets/tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Thread, Ticket]),
    MessagesModule,
    ThreadsModule,
    TicketsModule,
  ],
  providers: [EmailsService, MessagesService, TicketsService],
  controllers: [EmailsController],
})
export class EmailsModule {}

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

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Thread, Ticket]),
    MessagesModule,
    ThreadsModule,
    TicketsModule,
  ],
  providers: [EmailsService],
  controllers: [EmailsController],
})
export class EmailsModule {}

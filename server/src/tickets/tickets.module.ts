import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './tickets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsModule } from 'src/threads/threads.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), ThreadsModule, MessagesModule],
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TicketsService],
})
export class TicketsModule {}

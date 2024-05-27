import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { TicketsModule } from './tickets/tickets.module';
import { MessagesModule } from './messages/messages.module';
import { ThreadsModule } from './threads/threads.module';
import { TicketHistoryModule } from './ticket-history/ticket-history.module';
import { Message } from './messages/messages.entity';
import { Ticket } from './tickets/tickets.entity';
import { TicketHistory } from './ticket-history/ticket-history.entity';
import { Thread } from './threads/threads.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'platform',
      entities: [User, Message, Ticket, TicketHistory, Thread],
      synchronize: true,
    }),
    UsersModule,
    TicketsModule,
    MessagesModule,
    ThreadsModule,
    TicketHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

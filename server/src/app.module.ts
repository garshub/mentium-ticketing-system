import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.entity';
import { Message } from './messages/messages.entity';
import { Ticket } from './tickets/tickets.entity';
import { Thread } from './threads/threads.entity';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { MessagesModule } from './messages/messages.module';
import { ThreadsModule } from './threads/threads.module';
import { EmailsModule } from './emails/emails.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { TicketsController } from './tickets/tickets.controller';
import { MessagesController } from './messages/messages.controller';
import { ThreadsController } from './threads/threads.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASES,
      entities: [User, Message, Ticket, Thread],
      synchronize: true,
    }),
    UsersModule,
    TicketsModule,
    MessagesModule,
    ThreadsModule,
    EmailsModule,
    AuthModule,
  ],
  controllers: [
    UsersController,
    TicketsController,
    MessagesController,
    ThreadsController,
  ],
})
export class AppModule {}

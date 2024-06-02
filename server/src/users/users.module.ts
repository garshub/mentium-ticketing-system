import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { TicketsModule } from 'src/tickets/tickets.module';
import { TicketsService } from 'src/tickets/tickets.service';
import { Ticket } from 'src/tickets/tickets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ticket]), TicketsModule],
  providers: [UsersService, TicketsService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

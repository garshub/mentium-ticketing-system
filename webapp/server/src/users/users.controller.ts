import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  ping(): string {
    return 'Route Alive';
  }

  //create auth routes

  @Get(':id')
  async getTicketsByUserId(@Param('id') id: number): Promise<User> {
    return await this.usersService.findTicketsForUser(id);
  }
}

import { Controller, Get, Param, Patch } from '@nestjs/common';
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

  @Patch('link-ticket-user/:uid/:tid')
  async linkTicketWithUser(
    @Param('uid') uid: string,
    @Param('tid') tid: string,
  ) {
    return this.usersService.linkTicketToUser(parseInt(uid, 10), tid);
  }
}

import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  ping(): string {
    return 'Route Alive';
  }

  @Get(':id')
  async getTicketsByUserId(@Param('id') id: number): Promise<User> {
    return await this.usersService.findTicketsForUser(id);
  }

  @Patch('link-ticket-user/:uid/:tid')
  async linkTicketWithUser(
    @Param('uid') uid: string,
    @Param('tid') tid: string,
  ) {
    try {
      await this.usersService.linkTicketToUser(parseInt(uid, 10), tid);
      return { message: 'Ticket Linked to User' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { Controller, Get } from '@nestjs/common';
import {
  fetchMessageList,
  fetchRecentThreads,
  searchInbox,
} from 'src/common/utilities/nylas';

@Controller('users')
export class UsersController {
  //   constructor(private readonly appService: UsersService) {}

  @Get()
  ping(): string {
    return 'Route Alive';
  }

  @Get('/threads')
  async threads(): Promise<string> {
    const result = await fetchRecentThreads();
    return result;
  }

  @Get('/messages')
  async messages(): Promise<string> {
    const result = await fetchMessageList('');
    return result;
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';
import {
  fetchAllMessagesFromThread,
  fetchSingleMessage,
  sendEmail,
} from 'src/common/utilities/nylas';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { ThreadsService } from 'src/threads/threads.service';
import { transformApiResponse } from 'src/common/utilities/utilities';

@Controller('emails')
export class EmailsController {
  constructor(
    private readonly emailsService: EmailsService,
    private readonly messagesService: MessagesService,
    private readonly threadsService: ThreadsService,
  ) {}

  @Get('/processEmails')
  async processEmails() {
    await this.emailsService.fetchAndProcessEmails();
    return 'Success';
  }

  @Post('/replyTo')
  async sendEmail(@Body() sendEmailParams: SendEmailParams) {
    const result = await sendEmail(sendEmailParams);
    console.log(`Message Successfully Sent to ${sendEmailParams.to[0].name}`);
    const thread = await this.threadsService.findOne(result.data.threadId);
    const createEmailMessageDto = new CreateMessageDto(
      result.data.id,
      sendEmailParams.body,
      process.env.SUPPORT_NAME,
      thread.ticket,
    );
    await this.messagesService.create(createEmailMessageDto);
    console.log('Message Successfully saved');

    return result;
  }

  @Get(':messageId')
  async fetchSingleMessage(@Param('messageId') messageId: string) {
    const result = await fetchSingleMessage(messageId);
    return result;
  }

  @Post('/get-messages-from-thread/:threadId')
  async fetchMessagesFromThread(@Param('threadId') threadId: string) {
    const result = await fetchAllMessagesFromThread(threadId);
    const formatterResult = transformApiResponse(result.data);
    return formatterResult;
  }
}

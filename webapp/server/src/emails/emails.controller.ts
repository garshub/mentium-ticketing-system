import { Body, Controller, Get } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { sendEmail } from 'src/common/utilities/nylas';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  async processEmails() {
    await this.emailsService.fetchAndProcessEmails();
    return 'Success';
  }

  @Get('/replyTo')
  async sendEmail(@Body() sendEmailParams: SendEmailParams) {
    const result = await sendEmail(sendEmailParams);
    //push message to ticket
    return result;
  }
}

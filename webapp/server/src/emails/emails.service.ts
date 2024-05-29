import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/common/interfaces/email.interface';
import { fetchMessageList } from 'src/common/utilities/nylas';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { Message } from 'src/messages/messages.entity';
import { MessagesService } from 'src/messages/messages.service';
import { CreateThreadDto } from 'src/threads/dto/create-thread.dto';
import { Thread } from 'src/threads/threads.entity';
import { ThreadsService } from 'src/threads/threads.service';
import { CreateTicketDto } from 'src/tickets/dto/create-ticket.dto';
import { Ticket } from 'src/tickets/tickets.entity';
import { TicketsService } from 'src/tickets/tickets.service';
import { Repository } from 'typeorm';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Thread)
    private threadsRepository: Repository<Thread>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    private threadsService: ThreadsService,
    private messagesService: MessagesService,
    private ticketsService: TicketsService,
  ) {}

  async fetchAndProcessEmails() {
    let pageToken: string | undefined = '';

    try {
      do {
        console.log('Inside fetch method');
        const emailsResult = await fetchMessageList('');
        const emails: Email[] = emailsResult.data;
        console.log('Email Batch Size : ' + emails.length);
        pageToken = emailsResult.nextCursor;
        console.log('Has page token' + pageToken);
        this.processEmails(emails);
      } while (pageToken);
    } catch (error) {
      console.log(error);
    }
  }

  async processEmails(emails: Email[]) {
    try {
      for (const email of emails) {
        const threadId = email.threadId;
        const msgId = email.id;
        const content = email.snippet;
        const requesterName = email.from[0].name;
        const existingThread = await this.threadsService.findOne(threadId);
        const existingMessage = await this.messagesRepository.findOneBy({
          id: msgId,
        });
        if (!existingMessage) {
          if (existingThread) {
            //create message and attach to ticket
            console.log(
              `MsgID: ${msgId} ThreadId: ${existingThread.ticket.id}`,
            );
            const createMessageDto = new CreateMessageDto(
              msgId,
              content,
              requesterName,
              existingThread.ticket,
            );
            await this.messagesService.create(createMessageDto);
          } else {
            const requesterEmail = email.from[0].email;
            const subject = email.subject;
            //create thread
            const createThreadDto = new CreateThreadDto(threadId);
            const newThread = await this.threadsService.create(createThreadDto);
            //create ticket
            const createTicketDto = new CreateTicketDto(
              newThread,
              requesterName,
              subject,
              requesterEmail,
            );

            const newTicket = await this.ticketsService.create(createTicketDto);
            //create message and attach to ticket
            const createMessageDto = new CreateMessageDto(
              msgId,
              content,
              requesterName,
              newTicket,
            );
            await this.messagesService.create(createMessageDto);
          }
        }
      }
    } catch (error) {
      console.log('Error during email processing');
      console.log(error);
    }
  }
}

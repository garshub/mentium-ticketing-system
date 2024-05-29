import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/common/interfaces/email.interface';
import { fetchMessageList } from 'src/common/utilities/nylas';
import { Message } from 'src/messages/messages.entity';
import { Thread } from 'src/threads/threads.entity';
import { ThreadsService } from 'src/threads/threads.service';
import { Ticket } from 'src/tickets/tickets.entity';
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
            const newMessage = this.messagesRepository.create({
              id: msgId,
              content: content,
              ticket: existingThread.ticket,
            });
            await this.messagesRepository.save(newMessage);
          } else {
            const requesterName = email.from[0].name;
            const requesterEmail = email.from[0].email;
            const subject = email.subject;
            //create thread
            const newThread = this.threadsRepository.create({
              id: threadId,
            });
            await this.threadsRepository.save(newThread);
            //create ticket
            const newTicket = this.ticketsRepository.create({
              thread: newThread,
              requesterName,
              requesterEmail,
              subject,
            });
            await this.ticketsRepository.save(newTicket);
            //create message and attach to ticket
            const newMessage = this.messagesRepository.create({
              id: msgId,
              content: content,
              ticket: newTicket,
            });
            await this.messagesRepository.save(newMessage);
          }
        }
      }
    } catch (error) {
      console.log('Error during email processing');
      console.log(error);
    }
  }
}

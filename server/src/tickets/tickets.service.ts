import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketPriority, TicketStatus } from 'src/common/utilities/enums';
import { Ticket } from './tickets.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async createTicketFromEmail(email: any): Promise<Ticket> {
    const newTicket = this.ticketRepository.create({
      thread: email.thread_id,
      requesterName: email.requesterName,
      requesterEmail: email.requesterEmail,
      messages: [email],
    });
    return await this.ticketRepository.save(newTicket);
  }

  async addMessageToTicket(ticketId: string, message: any) {
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });
    if (ticket) {
      ticket.messages.push(message);
      await this.ticketRepository.save(ticket);
    }
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ['thread', 'user', 'messages'],
    });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['thread', 'user', 'messages'],
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    Object.assign(ticket, updateTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async updateStatus(id: string, status: TicketStatus): Promise<Ticket> {
    const ticket = await this.findOne(id);
    ticket.status = status;
    return this.ticketRepository.save(ticket);
  }

  async saveTicket(ticket: Ticket): Promise<Ticket> {
    return this.ticketRepository.save(ticket);
  }

  async updatePriority(id: string, priority: TicketPriority): Promise<Ticket> {
    const ticket = await this.findOne(id);
    ticket.priority = priority;
    return this.ticketRepository.save(ticket);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { TicketsService } from 'src/tickets/tickets.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private ticketsService: TicketsService,
  ) {}

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email: email });
  }

  findTicketsForUser(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: ['ticket'],
    });
  }

  async linkTicketToUser(uid: number, tid: string) {
    try {
      const ticket = await this.ticketsService.findOne(tid);
      const user = await this.usersRepository.findOneBy({ id: uid });

      if (!ticket || !user) {
        throw new BadRequestException('Incorrect Ticket Id or User Id');
      }

      // Initialize the ticket array if it's not already initialized
      if (!user.ticket) {
        user.ticket = [];
      }

      // Check if the ticket is already associated with the user
      const isTicketAssociated = user.ticket.some((t) => t.id === ticket.id);
      if (isTicketAssociated) {
        throw new BadRequestException('Ticket already linked to user');
      }

      // Associate the ticket with the user
      ticket.user = user;

      // Save the ticket to update the relationship
      await this.ticketsService.saveTicket(ticket);
    } catch (error) {
      console.log('Error linking user with ticket: ' + error.message);
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }
}

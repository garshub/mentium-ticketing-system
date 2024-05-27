import { TicketPriority, TicketStatus } from 'src/common/utilities/enums';
import { Ticket } from 'src/tickets/tickets.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicketHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketHistory, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;

  @Column()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.NEW,
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.LOW,
  })
  priority: TicketPriority;
}

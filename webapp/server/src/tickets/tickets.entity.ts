import { TicketPriority, TicketStatus } from 'src/common/utilities/enums';
import { Message } from 'src/messages/messages.entity';
import { Thread } from 'src/threads/threads.entity';
import { TicketHistory } from 'src/ticket-history/ticket-history.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Thread, { onDelete: 'CASCADE' })
  @JoinColumn()
  thread: Thread;

  @Column()
  requesterName: string;

  @Column()
  requesterEmail: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

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

  @OneToMany(() => Message, (message) => message.ticket, { cascade: true })
  messages: Message[];

  @OneToMany(() => TicketHistory, (ticketHistory) => ticketHistory.ticket, {
    cascade: true,
  })
  ticketHistory: TicketHistory[];
}

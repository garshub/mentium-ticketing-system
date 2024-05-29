import { Ticket } from 'src/tickets/tickets.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  senderName: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Ticket, (ticket) => ticket.messages, { onDelete: 'CASCADE' })
  @JoinColumn()
  ticket: Ticket;
}

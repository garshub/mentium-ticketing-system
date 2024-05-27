import { Ticket } from 'src/tickets/tickets.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Thread {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Ticket, { onDelete: 'CASCADE' })
  @JoinColumn()
  ticket: Ticket;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

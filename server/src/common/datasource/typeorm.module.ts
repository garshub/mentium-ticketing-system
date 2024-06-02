import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { Message } from 'src/messages/messages.entity';
import { Ticket } from 'src/tickets/tickets.entity';
import { Thread } from 'src/threads/threads.entity';
import { User } from 'src/users/users.entity';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASES,
            entities: [User, Message, Ticket, Thread],
            synchronize: true,
            // entities: [`${__dirname}/../**/**.entity{.ts,.js}`], // this will automatically load all entity file in the src folder
          });
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}

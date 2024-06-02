import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './threads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thread])],
  providers: [ThreadsService],
  controllers: [ThreadsController],
  exports: [ThreadsService],
})
export class ThreadsModule {}

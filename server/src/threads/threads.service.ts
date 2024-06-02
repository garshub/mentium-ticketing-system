import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './threads.entity';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private threadRepository: Repository<Thread>,
  ) {}

  async create(createThreadDto: CreateThreadDto): Promise<Thread> {
    const thread = this.threadRepository.create(createThreadDto);
    return this.threadRepository.save(thread);
  }

  async findAll(): Promise<Thread[]> {
    return this.threadRepository.find({ relations: ['ticket'] });
  }

  async findOne(id: string): Promise<Thread> {
    const thread = await this.threadRepository.findOne({
      where: { id: id },
      relations: ['ticket'],
    });
    if (!thread) {
      console.log(`ThreadID ${id} not found`);
    }
    return thread;
  }

  async update(id: string, updateThreadDto: UpdateThreadDto): Promise<Thread> {
    const thread = await this.findOne(id);
    Object.assign(thread, updateThreadDto);
    return this.threadRepository.save(thread);
  }

  async remove(id: string): Promise<void> {
    const thread = await this.findOne(id);
    await this.threadRepository.remove(thread);
  }
}

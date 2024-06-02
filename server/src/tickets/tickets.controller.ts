import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async getAllTickets() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  async getTicketById(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  async updateTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, updateTicketDto);
  }
}

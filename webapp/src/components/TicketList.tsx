import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import TicketTable from "./TicketTable";

const tickets = [
  {
    id: 815,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    priority: "Low",
    status: "New",
  },
  {
    id: 816,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    priority: "Low",
    status: "New",
  },
  {
    id: 817,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    priority: "Low",
    status: "New",
  },
  {
    id: 818,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    priority: "Low",
    status: "New",
  },
  {
    id: 819,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    priority: "Low",
    status: "New",
  },
  {
    id: 820,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    priority: "Low",
    status: "New",
  },
  {
    id: 160,
    subject: "Care and maintenance instructions",
    requester: "James Keenan",
    requested: "Aug 10, 2020",
    priority: "High",
    status: "Open",
  },
  {
    id: 629,
    subject: "Promo Codes?",
    requester: "Web User d23f9ccdfd097dcf58e4977e",
    requested: "Jun 18, 2021",
    priority: "Low",
    status: "Open",
  },
  {
    id: 575,
    subject: "Refund on order",
    requester: "Amy Skomaker",
    requested: "Apr 26, 2021",
    priority: "High",
    status: "Pending",
  },
  {
    id: 58,
    subject: "Price change",
    requester: "Scarlett Simpson",
    requested: "Jun 01, 2020",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 833,
    subject: "What's your return policy?",
    requester: "Felix Pierce",
    requested: "about 1 hour ago",
    priority: "High",
    status: "Solved",
  },
];

const segregateTicketsByStatus = (tickets: any[]) => {
  return tickets.reduce((acc: any, ticket) => {
    const { status } = ticket;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(ticket);
    return acc;
  }, {});
};

interface TicketListProps {
  onTicketClick: (ticket: any) => void;
}

const TicketList: React.FC<TicketListProps> = ({ onTicketClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter((ticket) =>
        ticket.id.toString().includes(query)
      );
      setFilteredTickets(filtered);
    }
  };

  const ticketsByStatus = segregateTicketsByStatus(filteredTickets);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Mentium Ticket Support Platform
      </Typography>
      <TextField
        label="Search by Ticket #"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      {Object.keys(ticketsByStatus).map((status) => (
        <TicketTable
          key={status}
          status={status}
          tickets={ticketsByStatus[status]}
          onTicketClick={onTicketClick}
        />
      ))}
    </Box>
  );
};

export default TicketList;

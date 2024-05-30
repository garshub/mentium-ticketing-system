import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import TicketTable from "./TicketTable";
import { useFetchAllTickets } from "../hooks/hooks";
import { Ticket, TicketListProps } from "../types";

const segregateTicketsByStatus = (tickets: Ticket[]) => {
  const orderedStatusKeys = ["NEW", "OPEN", "PENDING", "CLOSED"];

  return orderedStatusKeys.reduce((acc: any, status) => {
    acc[status] = tickets.filter((ticket) => ticket.status === status);
    return acc;
  }, {});
};

const TicketList: React.FC<TicketListProps> = ({ onTicketClick }) => {
  const { data: tickets = [], isLoading, error } = useFetchAllTickets();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);

  useEffect(() => {
    const filtered = tickets.filter((ticket) =>
      ticket.id.toString().includes(searchQuery)
    );
    setFilteredTickets(filtered);
  }, [searchQuery, tickets]);

  useEffect(() => {
    const filtered = tickets
      .filter((ticket) =>
        filterStatus === "All" ? true : ticket.status === filterStatus
      )
      .filter((ticket) =>
        filterPriority === "All" ? true : ticket.priority === filterPriority
      );
    setFilteredTickets(filtered);
  }, [filterStatus, filterPriority, tickets]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error: {(error as Error).message}</div>;
  }

  const ticketsByStatus = segregateTicketsByStatus(filteredTickets);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Mentium Ticket Support Platform
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            label="Search by Ticket #"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as string)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="NEW">New</MenuItem>
              <MenuItem value="OPEN">Open</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="CLOSED">Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <Select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as string)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="All">All Priority</MenuItem>
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
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

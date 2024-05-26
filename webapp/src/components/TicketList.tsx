// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Divider,
// } from "@mui/material";

// // Sample ticket data
// const tickets = [
//   {
//     id: 815,
//     subject: "Conversation with Sofia Eames",
//     requester: "Sofia Eames",
//     requested: "< 1 min ago",
//     channel: "Messaging",
//     status: "New",
//   },
//   {
//     id: 817,
//     subject: "Conversation with Sofia Eames",
//     requester: "Sofia Eames",
//     requested: "< 1 min ago",
//     channel: "Messaging",
//     status: "New",
//   },
//   {
//     id: 818,
//     subject: "Conversation with Sofia Eames",
//     requester: "Sofia Eames",
//     requested: "< 1 min ago",
//     channel: "Messaging",
//     status: "New",
//   },
//   {
//     id: 819,
//     subject: "Conversation with Sofia Eames",
//     requester: "Sofia Eames",
//     requested: "< 1 min ago",
//     channel: "Messaging",
//     status: "New",
//   },
//   {
//     id: 820,
//     subject: "Conversation with Sofia Eames",
//     requester: "Sofia Eames",
//     requested: "< 1 min ago",
//     channel: "Messaging",
//     status: "New",
//   },
//   {
//     id: 821,
//     subject: "Conversation with Sofia Eames",
//     requester: "ABC ABC",
//     requested: "< 1 min ago",
//     channel: "Messaging",
//     status: "New",
//   },
//   {
//     id: 160,
//     subject: "Care and maintenance instructions",
//     requester: "James Keenan",
//     requested: "Aug 10, 2020",
//     channel: "Voicemail",
//     status: "Open",
//   },
//   {
//     id: 629,
//     subject: "Promo Codes?",
//     requester: "Web User d23f9ccdff097dcf58e4977e",
//     requested: "Jun 18, 2021",
//     channel: "Messaging",
//     status: "Open",
//   },
//   {
//     id: 575,
//     subject: "Refund on order",
//     requester: "Amy Skomaker",
//     requested: "Apr 26, 2021",
//     channel: "Web Widget",
//     status: "Pending",
//   },
//   {
//     id: 58,
//     subject: "Price change",
//     requester: "Scarlett Simpson",
//     requested: "Jun 01, 2020",
//     channel: "Web form",
//     status: "Pending",
//   },
//   {
//     id: 833,
//     subject: "What's your return policy?",
//     requester: "Felix Pierce",
//     requested: "about 1 hour ago",
//     channel: "Mail",
//     status: "Solved",
//   },
//   {
//     id: 816,
//     subject: "Another conversation",
//     requester: "Jane Doe",
//     requested: "< 5 min ago",
//     channel: "Email",
//     status: "New",
//   },
//   {
//     id: 161,
//     subject: "Another instruction",
//     requester: "John Smith",
//     requested: "Aug 11, 2020",
//     channel: "Voicemail",
//     status: "Open",
//   },
// ];

// const statusColors = {
//   New: "primary",
//   Open: "warning",
//   Pending: "info",
//   Solved: "success",
// };

// const segregateTickets = (tickets) => {
//   return tickets.reduce((acc, ticket) => {
//     if (!acc[ticket.status]) {
//       acc[ticket.status] = [];
//     }
//     acc[ticket.status].push(ticket);
//     return acc;
//   }, {});
// };

// const TicketList: React.FC = () => {
//   const segregatedTickets = segregateTickets(tickets);

//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom>
//         Tickets
//       </Typography>
//       {Object.keys(segregatedTickets).map((status) => (
//         <Box key={status} mb={3}>
//           <Typography variant="h6" gutterBottom>
//             Status: {status}
//           </Typography>
//           <TableContainer
//             component={Paper}
//             style={{ maxHeight: 300, overflowY: "auto" }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell
//                     style={{
//                       width: "3%",
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                       height: "40px",
//                     }}
//                   >
//                     Ticket #
//                   </TableCell>
//                   <TableCell
//                     style={{
//                       width: "20%",
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                       height: "40px",
//                     }}
//                   >
//                     Subject
//                   </TableCell>
//                   <TableCell
//                     style={{
//                       width: "10%",
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                       height: "40px",
//                     }}
//                   >
//                     Requester
//                   </TableCell>
//                   <TableCell
//                     style={{
//                       width: "10%",
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                       height: "40px",
//                     }}
//                   >
//                     Requested
//                   </TableCell>
//                   <TableCell
//                     style={{
//                       width: "10%",
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                       height: "40px",
//                     }}
//                   >
//                     Channel
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {segregatedTickets[status].slice(0, 4).map((ticket) => (
//                   <TableRow key={ticket.id}>
//                     <TableCell
//                       style={{
//                         width: "3%",
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 1,
//                         height: "40px",
//                       }}
//                     >
//                       <Chip
//                         label={`#${ticket.id}`}
//                         color={statusColors[status]}
//                       />
//                     </TableCell>
//                     <TableCell
//                       style={{
//                         width: "3%",
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 1,
//                         height: "40px",
//                       }}
//                     >
//                       {ticket.subject}
//                     </TableCell>
//                     <TableCell
//                       style={{
//                         width: "20%",
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 1,
//                         height: "40px",
//                       }}
//                     >
//                       {ticket.requester}
//                     </TableCell>
//                     <TableCell
//                       style={{
//                         width: "10%",
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 1,
//                         height: "40px",
//                       }}
//                     >
//                       {ticket.requested}
//                     </TableCell>
//                     <TableCell
//                       style={{
//                         width: "10%",
//                         position: "sticky",
//                         top: 0,
//                         zIndex: 1,
//                         height: "40px",
//                       }}
//                     >
//                       {ticket.channel}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Divider />
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default TicketList;

import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import TicketTable from "./TicketTable";

const tickets = [
  {
    id: 815,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    channel: "Messaging",
    status: "New",
  },
  {
    id: 816,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    channel: "Messaging",
    status: "New",
  },
  {
    id: 817,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    channel: "Messaging",
    status: "New",
  },
  {
    id: 818,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    channel: "Messaging",
    status: "New",
  },
  {
    id: 819,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    channel: "Messaging",
    status: "New",
  },
  {
    id: 820,
    subject: "Conversation with Sofia Eames",
    requester: "Sofia Eames",
    requested: "< 1 min ago",
    channel: "Messaging",
    status: "New",
  },
  {
    id: 160,
    subject: "Care and maintenance instructions",
    requester: "James Keenan",
    requested: "Aug 10, 2020",
    channel: "Voicemail",
    status: "Open",
  },
  {
    id: 629,
    subject: "Promo Codes?",
    requester: "Web User d23f9ccdfd097dcf58e4977e",
    requested: "Jun 18, 2021",
    channel: "Messaging",
    status: "Open",
  },
  {
    id: 575,
    subject: "Refund on order",
    requester: "Amy Skomaker",
    requested: "Apr 26, 2021",
    channel: "Web Widget",
    status: "Pending",
  },
  {
    id: 58,
    subject: "Price change",
    requester: "Scarlett Simpson",
    requested: "Jun 01, 2020",
    channel: "Web form",
    status: "Pending",
  },
  {
    id: 833,
    subject: "What's your return policy?",
    requester: "Felix Pierce",
    requested: "about 1 hour ago",
    channel: "Mail",
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

const TicketList: React.FC = () => {
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
        />
      ))}
    </Box>
  );
};

export default TicketList;

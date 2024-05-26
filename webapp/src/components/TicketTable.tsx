import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
} from "@mui/material";

interface Ticket {
  id: number;
  subject: string;
  requester: string;
  requested: string;
  channel: string;
  status: string;
}

interface TicketTableProps {
  status: string;
  tickets: Ticket[];
}

const statusColors: { [key: string]: string } = {
  New: "orange",
  Open: "red",
  Pending: "blue",
  Solved: "green",
};

const TicketTable: React.FC<TicketTableProps> = ({ status, tickets }) => {
  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Status: {status}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell
                style={{
                  width: "10%",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  height: 40,
                  fontWeight: "bold",
                }}
              >
                Ticket #
              </TableCell>
              <TableCell
                style={{
                  width: "30%",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  height: 40,
                  fontWeight: "bold",
                }}
              >
                Subject
              </TableCell>
              <TableCell
                style={{
                  width: "20%",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  height: 40,
                  fontWeight: "bold",
                }}
              >
                Requester
              </TableCell>
              <TableCell
                style={{
                  width: "15%",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  height: 40,
                  fontWeight: "bold",
                }}
              >
                Requested
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell align="left">
                  <Chip
                    label={`#${ticket.id}`}
                    style={{
                      backgroundColor: statusColors[ticket.status],
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
                <TableCell align="left">{ticket.subject}</TableCell>
                <TableCell align="left">{ticket.requester}</TableCell>
                <TableCell align="left">{ticket.requested}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TicketTable;

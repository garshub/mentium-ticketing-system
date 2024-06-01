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
import { TicketTableProps } from "../types";
import DateFormatter from "./DateFormatter";

const statusColors: { [key: string]: string } = {
  NEW: "orange",
  OPEN: "red",
  PENDING: "blue",
  CLOSED: "green",
};

const priorityColors: { [key: string]: string } = {
  LOW: "green",
  MEDIUM: "yellow",
  HIGH: "red",
};

const TicketTable: React.FC<TicketTableProps> = ({
  status,
  tickets,
  onTicketClick,
}) => {
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
                  width: "5%",
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
                  width: "15%",
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
                  width: "10%",
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
                  width: "10%",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  height: 40,
                  fontWeight: "bold",
                }}
              >
                Requested At
              </TableCell>
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
                Assigned To
              </TableCell>
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
                Priority
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                onClick={() => onTicketClick(ticket)}
                style={{ cursor: "pointer" }}
              >
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
                <TableCell align="left">{ticket.requesterName}</TableCell>
                <TableCell align="left">
                  {<DateFormatter dateTimeString={ticket.createdAt} />}
                </TableCell>
                <TableCell align="left">
                  {ticket.user ? ticket.user.name : "Unassigned"}
                </TableCell>
                <TableCell align="left">
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      marginLeft: "8px",
                      marginRight: "8px",
                      backgroundColor:
                        priorityColors[ticket.priority] || "gray",
                    }}
                  ></span>
                  {ticket.priority}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TicketTable;

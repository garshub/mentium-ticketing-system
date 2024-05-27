import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

interface TicketViewProps {
  ticket: any;
  onBack: () => void;
}

const TicketView: React.FC<TicketViewProps> = ({ ticket, onBack }) => {
  return (
    <Box display="flex" height="100%">
      <Paper
        elevation={3}
        style={{ flex: 1, padding: "20px", marginRight: "20px" }}
      >
        <Typography variant="h5" gutterBottom>
          Ticket #{ticket.id}
        </Typography>
        <Typography variant="body1">
          <strong>Subject:</strong> {ticket.subject}
        </Typography>
        <Typography variant="body1">
          <strong>Requester:</strong> {ticket.requester}
        </Typography>
        <Typography variant="body1">
          <strong>Requested:</strong> {ticket.requested}
        </Typography>
        <Typography variant="body1">
          <strong>Priority:</strong> {ticket.priority}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {ticket.status}
        </Typography>
      </Paper>
      <Button variant="contained" onClick={onBack}>
        Back to Ticket List
      </Button>
    </Box>
  );
};

export default TicketView;

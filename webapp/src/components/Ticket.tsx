// Ticket.tsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface TicketProps {
  id: number;
  subject: string;
  requester: string;
  requested: string;
  channel: string;
  status: string;
}

const Ticket: React.FC<TicketProps> = ({
  id,
  subject,
  requester,
  requested,
  channel,
  status,
}) => {
  const statusColors: { [key: string]: string } = {
    New: "orange",
    Open: "red",
    Pending: "blue",
    Solved: "green",
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            #{id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {requested}
          </Typography>
        </Box>
        <Typography variant="h6" component="div">
          {subject}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {requester}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {channel}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Box
            sx={{
              backgroundColor: statusColors[status],
              color: "white",
              borderRadius: 1,
              padding: "2px 6px",
            }}
          >
            {status}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Ticket;

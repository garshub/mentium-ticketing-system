import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
  Menu,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Message from "./Message";

interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: string;
}

interface TicketViewProps {
  ticket: any;
  onBack: () => void;
}

const TicketView: React.FC<TicketViewProps> = ({ ticket, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "John",
      text: "Initial message",
      timestamp: "2023-05-26 10:00",
    },
    // Add more initial messages if needed
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "John",
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., update ticket details in the database
    console.log("Status:", status, "Priority:", priority);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={onBack} style={{ marginRight: "10px" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Mentium Ticket Support Platform</Typography>
      </Box>
      <Box display="flex" flexGrow={1} overflow="hidden">
        <Paper
          elevation={3}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            marginRight: "20px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Ticket #{ticket.id}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius={1}
            overflow="hidden"
          >
            <Box flexGrow={1} overflow="auto" mb={2}>
              {messages.map((msg) => (
                <Message
                  key={msg.id}
                  sender={msg.sender}
                  text={msg.text}
                  timestamp={msg.timestamp}
                />
              ))}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              mt={2}
              p={1}
              borderTop={1}
              borderColor="grey.300"
              borderRadius={1}
            >
              <TextField
                label="New message"
                variant="outlined"
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                multiline
                rows={6}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                      >
                        Send
                      </Button>
                    </InputAdornment>
                  ),
                  style: { height: "auto" },
                }}
              />
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          style={{
            width: "400px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Requester Details */}
          <Box
            flexGrow={1}
            border={1}
            borderColor="grey.300"
            borderRadius={1}
            p={2}
            mb={2}
          >
            <Typography variant="h6">Requester Details:</Typography>
            <Typography variant="subtitle1">
              Name: {ticket.requester}
            </Typography>
            <Typography variant="subtitle1">
              Email: {ticket.requesterEmail}
            </Typography>
          </Box>
          {/* Ticket Actions: */}
          <Box flexGrow={1} mb={2}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={status}
                onChange={handleStatusChange}
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="priority-select-label">Priority</InputLabel>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={priority}
                onChange={handlePriorityChange}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ alignSelf: "flex-end" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TicketView;

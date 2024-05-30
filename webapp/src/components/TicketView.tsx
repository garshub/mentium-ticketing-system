import React, { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Message from "./Message";
import {
  EmailMessageParams,
  MessageProp,
  TicketUpdateDtoParams,
  TicketViewProps,
} from "../types";
import { MdMail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import {
  createMessageAndSendEmail,
  fetchMessagesFromThread,
  updateTicket,
} from "../hooks/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketView: React.FC<TicketViewProps> = ({ ticket, onBack }) => {
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);

  // Sort messages on component mount or when ticket changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchThreadMessages = await fetchMessagesFromThread(
          ticket.thread.id
        );
        if (fetchThreadMessages) {
          const sortedMessages = fetchThreadMessages.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          setMessages(sortedMessages);
        }
        toast.success("Messages fetched successfully!");
      } catch (error) {
        toast.error("Error fetching messages");
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [ticket.thread.id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    const lastMessage = messages[messages.length - 1];

    //send email
    const emailMessageParams: EmailMessageParams = {
      subject: lastMessage.subject,
      body: newMessage,
      to: [{ name: ticket.requesterName, email: ticket.requesterEmail }],
      replyTo: [
        {
          name: "Mentium Ticket Support",
          email: "mentiumcodechallenge@outlook.com",
        },
      ],
      replyToMessageId: lastMessage.id.toString(),
    };

    const sendEmailResult = await createMessageAndSendEmail(emailMessageParams);

    const newMsg: MessageProp = {
      id: sendEmailResult.data.id,
      content: newMessage,
      senderName: "Mentium Ticket Support",
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      subject: sendEmailResult.data.subject,
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

  const handleSubmit = async () => {
    // Handle form submission
    console.log("Status:", status, "Priority:", priority);
    try {
      // Create a DTO object with form data
      const ticketUpdateDto: TicketUpdateDtoParams = {
        status: status,
        priority: priority,
      };

      // Call the API to update the ticket
      await updateTicket(ticket.id, ticketUpdateDto);
      console.log("Ticket Updated!");
      toast.success("Ticket Successfully Updated");
    } catch (error) {
      toast.error("Error Updating Ticket.");
      console.error("Error updating ticket:", error);
    }
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
          elevation={0}
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
                  sender={msg.senderName}
                  text={msg.content}
                  timestamp={msg.createdAt}
                />
              ))}
            </Box>
            <Paper>
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
            </Paper>
          </Box>
        </Paper>
        <Paper
          elevation={0}
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
            maxHeight={"130px"}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Requester Details:
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: "8px", mb: 1 }}
            >
              <FaRegUserCircle />
              <Typography variant="subtitle1">
                {ticket.requesterName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MdMail />
              <Typography variant="subtitle1">
                {ticket.requesterEmail}
              </Typography>
            </Box>
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
                <MenuItem value="NEW">New</MenuItem>
                <MenuItem value="OPEN">Open</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="CLOSED">Closed</MenuItem>
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
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
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

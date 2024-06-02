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
  SelectChangeEvent,
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
  linkUserWithTicket,
  updateTicket,
} from "../hooks/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketView: React.FC<TicketViewProps> = ({
  ticket,
  onBack,
  currentUser,
}) => {
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [assignedUser, setAssignedUser] = useState(ticket.user);

  useEffect(() => {
    const fetchData = async () => {
      const loadingToastId = toast.loading("Fetching messages...");

      try {
        const fetchThreadMessages = await fetchMessagesFromThread(
          ticket.thread.id
        );
        if (fetchThreadMessages) {
          const sortedMessages = fetchThreadMessages.sort(
            (a: MessageProp, b: MessageProp) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          setMessages(sortedMessages);
        }
        toast.update(loadingToastId, {
          render: "Messages fetched successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        toast.update(loadingToastId, {
          render: "Error fetching messages",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
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

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event: SelectChangeEvent<string>) => {
    setPriority(event.target.value);
  };

  const handleAssignToCurrentUser = async () => {
    if (currentUser) {
      try {
        await linkUserWithTicket(currentUser.id, ticket.id);
        setAssignedUser(currentUser);
        toast.success("Ticket assigned to you successfully!");
      } catch (error) {
        toast.error("Error assigning ticket.");
        console.error("Error assigning ticket:", error);
      }
    }
  };

  const handleSubmit = async () => {
    console.log("Status:", status, "Priority:", priority);
    try {
      const ticketUpdateDto: TicketUpdateDtoParams = {
        status: status,
        priority: priority,
      };

      await updateTicket(ticket.id, ticketUpdateDto);
      console.log("Ticket Updated!");
      toast.success("Ticket Successfully Updated");
    } catch (error) {
      toast.error("Error Updating Ticket.");
      console.error("Error updating ticket:", error);
    }
  };

  const isAssignedToCurrentUser =
    assignedUser && currentUser && assignedUser.id === currentUser.id;

  const isStatusClosed = ticket.status === "CLOSED";

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
                        disabled={!isAssignedToCurrentUser || isStatusClosed}
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

            <Box sx={{ flexGrow: 1, marginY: 2 }}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: "bold" }}>Assigned To:</span>{" "}
                {assignedUser ? assignedUser.name : "Unassigned"}
              </Typography>
              {!assignedUser && (
                <Typography
                  variant="body2"
                  sx={{ color: "blue", cursor: "pointer" }}
                  onClick={handleAssignToCurrentUser}
                >
                  Assign to me
                </Typography>
              )}
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ alignSelf: "flex-end" }}
                disabled={!isAssignedToCurrentUser}
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

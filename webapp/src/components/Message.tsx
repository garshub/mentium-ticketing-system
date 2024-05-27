import React from "react";
import { Typography, Paper } from "@mui/material";

interface MessageProps {
  text: string;
  timestamp: string;
  sender: string;
}

const Message: React.FC<MessageProps> = ({ text, timestamp, sender }) => {
  return (
    <Paper
      style={{
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h6">{sender}</Typography>
      <Typography variant="body1">{text}</Typography>
      <Typography variant="caption" color="textSecondary">
        {timestamp}
      </Typography>
    </Paper>
  );
};

export default Message;

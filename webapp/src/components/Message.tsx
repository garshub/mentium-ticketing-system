import React from "react";
import { Typography, Box } from "@mui/material";
import DateFormatter from "./DateFormatter";

interface MessageProps {
  text: string;
  timestamp: string;
  sender: string;
}

const Message: React.FC<MessageProps> = ({ text, timestamp, sender }) => {
  return (
    <Box
      style={{
        padding: "10px",
        marginBottom: "10px",
        // backgroundColor: "#f5f5f5",
      }}
    >
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          {sender}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          <DateFormatter dateTimeString={timestamp} />
        </Typography>
      </Box>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default Message;

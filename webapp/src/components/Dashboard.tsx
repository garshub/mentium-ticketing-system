import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import UserDetails from "./UserDetails";
import TicketList from "./TicketList";
import TicketView from "./TicketView";
import { UserProp } from "../types";

const Dashboard: React.FC<{
  userProp: UserProp | null;
  onLogout: () => void;
}> = ({ userProp, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleTicketClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsCollapsed(false);
  };

  const handleBackToTicketList = () => {
    setSelectedTicket(null);
    setIsCollapsed(false);
  };

  return (
    <Box p={3} height="100vh" display="flex">
      <Box
        width={isCollapsed ? "80px" : "300px"}
        display="flex"
        flexDirection="column"
        transition="width 0.3s"
      >
        <Paper
          elevation={3}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <UserDetails
            isCollapsed={isCollapsed}
            onToggleCollapse={handleToggleCollapse}
            userProp={userProp}
            onLogout={onLogout}
          />
        </Paper>
      </Box>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        ml={isCollapsed ? 1 : 2}
      >
        <Paper
          elevation={3}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Box p={2} flexGrow={1} overflow="auto">
            {selectedTicket ? (
              <TicketView
                ticket={selectedTicket}
                onBack={handleBackToTicketList}
              />
            ) : (
              <TicketList onTicketClick={handleTicketClick} />
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import UserDetails from "./UserDetails";
import TicketList from "./TicketList";

const Dashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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
            <TicketList />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;

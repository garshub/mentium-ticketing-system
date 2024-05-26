import React from "react";
import { Box, Paper } from "@mui/material";
import UserDetails from "./UserDetails";
import TicketList from "./TicketList";

const Dashboard: React.FC = () => {
  return (
    <Box p={3} height="100vh" display="flex">
      <Box
        width="10%"
        maxWidth="300px"
        minWidth="300px"
        display="flex"
        flexDirection="column"
        mr={2}
      >
        <Paper
          elevation={3}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <UserDetails />
        </Paper>
      </Box>
      <Box flexGrow={1} display="flex" flexDirection="column">
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

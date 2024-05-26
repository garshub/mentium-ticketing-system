import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";

const UserDetails: React.FC = () => {
  // Sample user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://via.placeholder.com/150",
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <Box textAlign="center" p={2}>
        <Avatar
          alt={user.name}
          src={user.avatarUrl}
          sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </Box>
      <Box p={2}>
        <Button variant="contained" color="primary" fullWidth>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetails;

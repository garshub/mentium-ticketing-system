import React from "react";
import { Box, Typography, Avatar, Button, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface UserDetailsProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  isCollapsed,
  onToggleCollapse,
}) => {
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
      alignItems="center"
      height="100%"
      p={2}
    >
      <Box display="flex" justifyContent="center" width="100%">
        <IconButton onClick={onToggleCollapse} size="small">
          {isCollapsed ? <ArrowForward /> : <ArrowBack />}
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
        <Avatar
          alt={user.name}
          src={user.avatarUrl}
          sx={{
            width: isCollapsed ? 40 : 100,
            height: isCollapsed ? 40 : 100,
            mb: isCollapsed ? 1 : 2,
          }}
        />
        {!isCollapsed && (
          <>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </>
        )}
      </Box>
      <Box mt={2} width="100%">
        {!isCollapsed && (
          <Button variant="contained" color="primary" fullWidth>
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserDetails;

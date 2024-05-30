// UserDetails.jsx
import React from "react";
import { Box, Typography, Avatar, Button, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { UserProp } from "../types";

interface UserDetailsProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userProp: UserProp | null;
  onLogout: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  isCollapsed,
  onToggleCollapse,
  userProp,
  onLogout,
}) => {
  const handleLogout = () => {
    // Call onLogout function when logout button is clicked
    onLogout();
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
          <Menu /> {}
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
        {userProp && ( // Check if userProp exists before rendering
          <>
            <Avatar
              alt={userProp.name}
              src={"logo.png"}
              sx={{
                width: isCollapsed ? 40 : 100,
                height: isCollapsed ? 40 : 100,
                mb: isCollapsed ? 1 : 2,
              }}
            />
            {!isCollapsed && (
              <>
                <Typography variant="h5">{userProp.name}</Typography>
                <Typography variant="body1">{userProp.email}</Typography>
              </>
            )}
          </>
        )}
      </Box>
      <Box mt={2} width="100%">
        {!isCollapsed && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserDetails;

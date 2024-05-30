import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { LoginParams, UserProp } from "../types";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { loginUser } from "../hooks/hooks";

interface LoginProps {
  onLogin: (userProp: UserProp, token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["token"]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginParams: LoginParams = {
        email: email,
        password: password,
      };
      const response = await loginUser(loginParams);
      const token = response.data.access_token;
      setCookie("token", token, { path: "/" });
      toast.success("Login Successful");
      const userProp: UserProp = {
        id: response.data.userId,
        email: email,
        name: response.data.userName,
      };
      onLogin(userProp, token);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <Box
          component="form"
          width="100%"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

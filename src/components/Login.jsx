import React, { useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { BaseUrl } from "../constant/config.js";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  console.log(BaseUrl);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${BaseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "/dashboard";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const data = await fetch(`${BaseUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#fff",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{isLogin ? "Login" : "Sign Up"}</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={isLogin ? handleLogin : handleSignup}
          >
            <TextField
              required
              fullWidth
              label="name"
              name="name"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
            <Typography textAlign="center" m="1rem">
              OR
            </Typography>
            <Button fullWidth variant="text" onClick={toggleLogin}>
              {isLogin ? "Sign Up Instead" : "Login Instead"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;

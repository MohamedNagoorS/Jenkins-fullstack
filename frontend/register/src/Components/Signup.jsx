import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/signup", { name, email, password })
            .then((result) => {
                if (result.status === 201) {
                    console.log("User Created Successfully");
                    navigate("/login");
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    window.alert("Email Already exists");
                } else {
                    console.log("DB Error");
                }
            });
    };

    return (
        <Grid container justifyContent="center" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3, width: 400 }}>
                <form onSubmit={handleSignup}>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        required
                        label="Enter Name"
                        variant="filled"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        onChange={(e) => setEmail(e.target.value)} // Corrected this to setEmail
                        name="email"
                        required
                        label="Enter Email"
                        variant="filled"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        required
                        label="Enter Password"
                        variant="filled"
                        type="password"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}

export default Signup;

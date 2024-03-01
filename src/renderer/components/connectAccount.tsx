import axios from 'axios';
import {
    Button,
    TextField,
    Typography,
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material';

import React, { FormEvent } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, setCurrentUser } from '../store/store';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ConnectAccount = () => {
    const [leetcodeURL, setUrl] = useState('');
    const dispatch = useDispatch();

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ): void => {
        console.log(event.currentTarget.value);
        setUrl(event.currentTarget.value);
    };

    const fetchUserData = async (username: string) => {
        await axios
            .get(`https://alfa-leetcode-api.onrender.com/${username}`)
            .then((res) => {
                const userData = res.data;
                if (res.status == 200) {
                    //store in redux, grab from redux in other page
                    dispatch(setCurrentUser({ username: username }));
                    dispatch(addUser({ username, data: userData }));
                }
            })
            .catch((err) => console.error('Error fetching user data:', err));
    };

    return (
        <div className="loginPage">
            <ThemeProvider theme={theme}>
                <Typography className="Title" variant="h4">
                    Leetcode Performance Dashboard
                </Typography>
            </ThemeProvider>
            <form className="loginForm">
                <TextField
                    id="outlined-basic"
                    label="Enter Your Leetcode Username…"
                    className="LoginInput"
                    variant="outlined"
                    onChange={handleChange}
                    sx={{ marginBottom: '5%' }}
                    fullWidth
                />
                <NavLink to="/userProfile">
                    <Button
                        variant="contained"
                        className="LoginButton"
                        onClick={() => {
                            fetchUserData(leetcodeURL);
                        }}
                    >
                        Retrieve Data
                    </Button>
                </NavLink>
            </form>
        </div>
    );
};

export default ConnectAccount;

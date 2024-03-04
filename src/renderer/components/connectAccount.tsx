import axios from 'axios';
import {
    Button,
    TextField,
    Typography,
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material';

import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, setCurrentUser, setLoading } from '../store/store';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ConnectAccount = () => {
    const [leetcodeURL, setUrl] = useState('');
    const dispatch = useDispatch();

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ): void => {
        setUrl(event.currentTarget.value);
    };

    const fetchUserData = async (username: string) => {
        await axios
            .get(`https://alfa-leetcode-api.onrender.com/${username}`)
            .then((res) => {
                const userData = res.data;
                console.log(userData);

                if (res.status == 200) {
                    //store in redux, grab from redux in other page
                    dispatch(setCurrentUser({ username: username }));
                    dispatch(addUser({ username, data: userData }));
                    dispatch(setLoading(false));
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
                    <div className="button-container">
                        <Button
                            variant="contained"
                            className="LoginButton"
                            onClick={() => {
                                fetchUserData(leetcodeURL);
                            }}
                        >
                            Retrieve Data
                        </Button>
                    </div>
                </NavLink>
            </form>
        </div>
    );
};

export default ConnectAccount;

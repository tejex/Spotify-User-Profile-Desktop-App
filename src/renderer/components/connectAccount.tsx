import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import React, { FormEvent } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ConnectAccount = () => {
    const [leetcodeURL, setUrl] = useState('');

    const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        console.log(event.currentTarget.value);
        setUrl(event.currentTarget.value);
    };

    const fetchUserData = async (username: string) => {
        //make a call with axios to the leetcode API
        //get all the data and return it to another page.
        console.log(username);
        await axios
            .get(`https://alfa-leetcode-api.onrender.com/${username}`)
            .then((res) => {
                console.log(res.data);
                if (res.status == 200) {
                    //send info to the next page and display the user profile
                    //place the user in saved users, redux or somewhere locally
                } else {
                    //display error message on screen, invalid username
                    console.log('Error' + res);
                }
            })
            .catch((err) => console.log('Error Bro' + err));
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
                    onChange={() => {
                        handleChange;
                    }}
                    sx={{ marginBottom: '5%' }}
                    fullWidth
                />
                {/* <NavLink to="/userProfile"> */}
                <Button
                    variant="contained"
                    className="LoginButton"
                    onClick={() => {
                        fetchUserData(leetcodeURL);
                    }}
                >
                    Retrieve Data
                </Button>
                {/* </NavLink> */}
            </form>
        </div>
    );
};

export default ConnectAccount;

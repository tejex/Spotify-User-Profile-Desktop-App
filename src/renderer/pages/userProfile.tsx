import React from 'react';
import {
    Button,
    TextField,
    Typography,
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    // const currentUser = useSelector((state) => state.currentUser);
    // const userData = useSelector((state) => state.users[currentUser]);
    return (
        <div>
            <h1>Hello</h1>
            <NavLink to="/">
                <Button>Back to Main Page</Button>
            </NavLink>
        </div>
    );
};

export default UserProfile;

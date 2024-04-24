import React from 'react'
import { Button } from '@mui/material'

export const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <h1 className="header">Spotify User Insights 🪄</h1>
            <Button
                className="loginButton"
                onClick={() => {
                    console.log('Login was clicked')
                }}
                size="large"
                sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    marginTop: '30%',
                    marginLeft: '25%',
                    fontSize: '20px',
                }}
                style={{ width: 400, height: 60, textTransform: 'none' }}
            >
                Login
            </Button>
        </div>
    )
}

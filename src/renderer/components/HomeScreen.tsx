import React from 'react'
import { Button } from '@mui/material'
import axios from 'axios'

export const HomeScreen = () => {
    const login = () => {
        axios.get('http://localhost:5001/login').then((response) => {
            console.log(response)
        })
    }

    return (
        <div className="homeScreen">
            <h1 className="header">Spotify User Insights 🪄</h1>
            <Button
                className="loginButton"
                onClick={() => {
                    login()
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

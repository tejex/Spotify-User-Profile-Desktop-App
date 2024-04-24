import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const start = async () => {
    try {
        app.listen(9000, () => {
            console.log(`Server is listening on port 5001`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

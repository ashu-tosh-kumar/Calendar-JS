import express from "express";
import { exceptions } from "./exceptions.js";
import { model } from "./model.js";

const app = express();
const port = 8081;

app.get('/', (req, res) => {
    res.send("Welcome to Calendar App. Please visit url: 'hostname:port/date' to try it.");
})

app.get('/:date', (req, res) => {
    const date = req.params.date;
    console.info(`GET call received to get date for: ${date}`);
    try {
        const dateMatrix = model.getDateMatrix(date);
        res.status(200);
        return res.send(dateMatrix);
    }
    catch (error) {
        if (error instanceof exceptions.InvalidDateFormat) {
            console.info("Date validation failed");
            res.status(400);
            return res.send(error.message);
        } else {
            console.error("Server side error. Please reach out to support team for help");
            res.status(500);
            return res.send("Server side issue");
        }
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
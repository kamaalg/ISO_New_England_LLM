const express = require("express");
const {spawn} = require("child_process");
const router = express.Router();
let chat_history = []
router.get("/get_query",(req, res) =>{
    const query = req.query.query;
    chat_history.push(query)
    bridge(query,chat_history)

    res.send({ message: "Query acquired successfully." });
})
function bridge(input_string,chat_history){
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python3', ['Shazam/azure api call/copilot_flow/copilot.py',input_string,chat_history]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Output from Python script: ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script finished with exit code ${code}`);
    });

}

module.exports = router
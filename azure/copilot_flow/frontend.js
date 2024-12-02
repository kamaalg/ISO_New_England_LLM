const express = require("express");
const {spawn} = require("child_process");
const repl = require("repl");
const router = express.Router();
let chat_history = []
router.get("/get_query",async (req, res) => {
    const query = req.query.query;
    chat_history.push(query)
    console.log(chat_history)
    let reply = ''
    try {
        const result = await bridge(query, chat_history);
        const parsed_result = JSON.parse(result)

        reply = parsed_result.reply
    } catch (error) {
        console.error(`Error: ${error.message}`);
        reply = "Some error occurred";
    }
    res.setHeader('Content-Type', 'application/json');

    res.status(200).json({
        message: reply,
    });
})
function bridge(input_string, chat_history) {
    const { spawn } = require('child_process');

    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['/Users/kamalgurbanov/IdeaProjects/cs320_project/Shazam/azure/copilot_flow/copilot.py', input_string, chat_history]);

        let stdoutData = '';
        let stderrData = '';

        pythonProcess.stdout.on('data', (data) => {
            stdoutData += data.toString(); // Collect stdout data
        });

        pythonProcess.stderr.on('data', (data) => {
            stderrData += data.toString(); // Collect stderr data
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(stdoutData) // Resolve with the collected stdout data
            } else {
                reject(new Error(`Python script exited with code ${code}: ${stderrData.trim()}`));
            }
        });

        pythonProcess.on('error', (error) => {
            reject(new Error(`Failed to start Python process: ${error.message}`));
        });
    });
}


module.exports = router
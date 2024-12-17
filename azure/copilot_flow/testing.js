const express = require('express');
const {spawn} = require("child_process");
const router = express.Router();


router.post("/test_model", async (req, res) => {
    const dictionary = req.body;//get expect_output key and user_input

    let expected_output = dictionary.expected_output
    let user_input = dictionary.user_input
    let model_response = ""
    let testing_response = {}
    try{
        result = await bridge_frontend(user_input,[])
        const parsed_result = JSON.parse(result)

        model_response = parsed_result.reply
    } catch (error) {
        console.error(`Error: ${error.message}`);
        reply = "Some error occurred";

    }
    try{
        let response_testing = await bridge_testing(user_input,expected_output,model_response)
        testing_response = JSON.parse(response_testing)


    } catch (error) {
        console.error(`Error: ${error.message}`);
        reply = "Some error occurred during testing";
    }
    const return_string = `${testing_response.response}\nRelevance: ${testing_response.relevance}\nCoherence: ${testing_response.coherence}\nSimilarity: ${testing_response.similarity}\nF1_score: ${testing_response.f1_score}`;





    res.status(200).json({
        message: return_string,
    });
});
function bridge_testing(user_input, expected_output,model_response) {
    const { spawn } = require('child_process');

    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['/Users/kamalgurbanov/IdeaProjects/cs320_project/Shazam/azure/copilot_flow/oneQuestionEval.py', user_input, expected_output,model_response]);

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
function bridge_frontend(input_string, chat_history) {
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
                reject(new Error(`Python script exited with code ${code}: ${stderrData}`));
            }
        });

        pythonProcess.on('error', (error) => {
            reject(new Error(`Failed to start Python process: ${error.message}`));
        });
    });
}
module.exports = router
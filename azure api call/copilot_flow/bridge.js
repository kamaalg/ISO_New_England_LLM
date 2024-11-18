const { spawn } = require('child_process');
const pythonProcess = spawn('python3', ['copilot.py']);

pythonProcess.stdout.on('data', (data) => {
    console.log(`Output from Python script: ${data.toString()}`);
});

pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data.toString()}`);
});

pythonProcess.on('close', (code) => {
    console.log(`Python script finished with exit code ${code}`);
});

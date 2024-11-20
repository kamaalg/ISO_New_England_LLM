const express = require("express")
const app = express()
app.use(express.json());
const cors = require('cors');

const testingroute =  require("./testing");
const frontendroute = require("./frontend")

const corsOptions = {
    origin: 'http://localhost:3001', // Allow requests only from the frontend
    optionsSuccessStatus: 200, // Some browsers require a 200 response for preflight requests
};
app.use(cors(corsOptions))

app.use('/testing', testingroute);
app.use('/frontend',frontendroute)

app.set("view engine","ejs")


app.listen(3000, () => console.log('server has started'));

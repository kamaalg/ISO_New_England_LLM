const express = require("express")
const app = express()
app.use(express.json());
const testingroute =  require("./testing");
const frontendroute = require("./frontend")

app.use('/testing', testingroute);
app.use('/frontend',frontendroute)

app.set("view engine","ejs")


app.listen(3000, () => console.log('server has started'));

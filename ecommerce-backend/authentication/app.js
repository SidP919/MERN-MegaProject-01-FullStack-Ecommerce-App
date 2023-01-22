const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("<h3>Authentication Backend Home Route</h3>");
})

module.exports = app;
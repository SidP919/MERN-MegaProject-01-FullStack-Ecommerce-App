const express = require("express");
const app = express();

app.get("/api/v1/dashboard", (req,res)=>{
    res.send("<h3>Ecommerce Backend Home Route</h3>");
})

app.get("/*", (req,res)=>{
    res.redirect("/api/v1/dashboard");
})
module.exports = app;
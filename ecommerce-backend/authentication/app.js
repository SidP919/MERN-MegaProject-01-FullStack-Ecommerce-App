const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const AUTH_CONFIG = require('./config/auth.config');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

// Setting up Morgan
app.use(
    morgan('combined',{
            skip: function (req, res) {
                if(AUTH_CONFIG.NODE_ENV === 'production') // check if App is running in PROD env
                    return res.statusCode < 400; // skip request that sends response with statusCode < 400 (only log errors)
                else
                    return; // don't skip anything (log everything)
            },
            immediate:true,
        }
    )
)

app.get("/", (req,res)=>{
    res.send("<h3>Authentication Backend Home Route</h3>");
})

module.exports = app;
const app = require("./app");
const config = require("./config/ecommerce.config")
const PORT = config.PORT;
const mongoose = require('mongoose');

(async () => {

    try {

        //Set up mongoose connection to MongoDB Atlas Database
        await mongoose.connect(config.MONGODB_URI)
        .then((db)=>{
            console.log(`\nApplication has successfully connected to MongoDB at ${db.connection.host}\n`);
        })
        .catch((err)=>{
            console.log(`\nConnection to MongoDB failed!\n`);
            throw err;
        })
        app.on('error',(err)=>{
            console.log("\nError thrown from app.on():\n");
            throw err;
        })

        // setup application to listen at config.PORT
        const listenFunc = () => {
            console.log(`Ecommerce Backend Server running on PORT:${PORT}`);
        }
        app.listen(PORT, listenFunc);

    } catch (error) {
        console.log("\nError Occurred!\n",error);
        throw error;
    }
})()
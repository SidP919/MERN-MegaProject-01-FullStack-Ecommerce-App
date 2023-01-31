const app = require("./app");
const config = require("./config/auth.config")
const mongoose = require('mongoose');

( async ()=>{
    try {
        //Set up mongoose connection to MongoDB Atlas Database
        await mongoose.connect(config.MONGODB_URI)
        .then((db)=>{
            console.log(`Application connected to MongoDB successfully at https://${db.connection.host}`)
        })
        .catch((error)=>{
            console.log("\nConnection to MongoDB failed!");
            throw error;
        });
        app.on('error', (err)=>{
            console.log("\nError thrown from app.on(): ", err);
            throw err;
        });

        // setup application to listen at config.PORT
        const PORT = config.PORT;
        const listenFunc = () => {
            console.log(`Server running on Port:${PORT}`)
        }
        app.listen(PORT, listenFunc);
    } catch (err) {
        console.log("\nError occurred!\n",err);
        throw err;
    }
})()
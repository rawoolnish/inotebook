const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/inotebook", {}).then(() => {
    console.log("connection is successfull");
}).catch((error) => {
    console.log("error! in connection")
});

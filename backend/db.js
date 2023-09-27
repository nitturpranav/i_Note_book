const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://nitturpranav:qmxJkKQGWPshFdyj@cluster1234892.grylugh.mongodb.net/?retryWrites=true&w=majority";


const connectToMongo = async () => { // Use async/await to handle promises
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;

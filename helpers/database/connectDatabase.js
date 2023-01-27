const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDb Connection Successful");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDatabase;

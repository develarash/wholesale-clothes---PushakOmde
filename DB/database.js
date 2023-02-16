const mongoose = require("mongoose");
// Connect to DB and start server
const runDb = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(">>>>>>MongoDb is running ");
    })
    .catch((err) => {
      console.log("Error eccured (DB) " + err);
    });
};
module.exports = runDb;
